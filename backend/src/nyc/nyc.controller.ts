import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NycService } from './nyc.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RequestQueryDto } from './dtos/request-query.dto';

@Controller('nyc')
export class NycController {
  constructor(private readonly nycService: NycService) {}

  @Get('total-trips')
  @UseGuards(JwtAccessGuard)
  async totalTrips(@Query() query: RequestQueryDto) {
    const response = await this.nycService.totalTrips(query);
    return response;
  }

  @Get('total-passengers')
  @UseGuards(JwtAccessGuard)
  async totalPassengers(@Query() query: RequestQueryDto) {
    const response = await this.nycService.totalPassengers(query);
    return response;
  }

  @Get('total-fare')
  @UseGuards(JwtAccessGuard)
  async totalFare(@Query() query: RequestQueryDto) {
    const response = await this.nycService.totalFare(query);
    return response;
  }

  @Get('avg-fare')
  @UseGuards(JwtAccessGuard)
  async avgFare(@Query() query: RequestQueryDto) {
    const response = await this.nycService.avgFare(query);
    return response;
  }
}
