import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthRequestDto } from './dtos/auth-request.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  protected readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signIn(auth: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(auth.email);

    if (!user || !(await bcrypt.compare(auth.password, user.password))) {
      throw new UnauthorizedException('Email or password wrong');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    const updated = await this.userService.update({
      ...user.get(),
      refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
    });

    return {
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
      },
      ...tokens,
    };
  }

  async refreshToken(id: number, refreshToken: string): Promise<string> {
    const user = await this.userService.findById(id);

    if (
      !user ||
      !user.refreshToken ||
      !(await bcrypt.compare(refreshToken, user.refreshToken))
    ) {
      throw new UnauthorizedException('Access Denied');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return token;
  }

  async generateTokens(id: number, email: string) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ id, email }),
      this.jwtService.signAsync(
        { id, email },
        {
          expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
