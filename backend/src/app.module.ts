import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, LoggerModule, DatabaseModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
