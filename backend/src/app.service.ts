import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnModuleInit {
  protected readonly logger = new Logger(AppService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async onModuleInit() {
    try {
      const adminEmail = this.config.get<string>('ADMIN_EMAIL');
      const adminPassword = this.config.get<string>('ADMIN_PASSWORD');

      await this.userService.findOrCreate({
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
      });

      this.logger.warn(`Init Admin Account ---`);
      this.logger.log(`email: ${adminEmail}`);
      this.logger.log(`password: ${adminPassword}`);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
