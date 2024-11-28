import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from '@nestjs/config';
import { NycController } from './nyc.controller';
import { NycService } from './nyc.service';

@Module({
  imports: [
    AxiosModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('NYC_BASE_URL'),
        headers: {
          'X-App-Token': config.get<string>('NYC_APP_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NycController],
  providers: [NycService],
})
export class NycModule {}
