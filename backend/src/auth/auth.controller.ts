import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidatorPipe } from 'src/pipes/joi-validator.pipe';
import { signInValidation } from './auth.validation';
import { AuthRequestDto } from './dtos/auth-request.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(new JoiValidatorPipe(signInValidation))
  async signIn(@Body() data: AuthRequestDto) {
    const response = await this.authService.signIn(data);
    return response;
  }

  @Get('refresh-token')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(@Req() req: Request) {
    const response = await this.authService.refreshToken(
      req.user['id'],
      req.user['refreshToken'],
    );

    return response;
  }
}
