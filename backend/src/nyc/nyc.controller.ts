import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NycService } from './nyc.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RequestQueryDto } from './dtos/request-query.dto';

@Controller('nyc')
export class NycController {
  constructor(private readonly nycService: NycService) {}

  @Get('totals')
  @UseGuards(JwtAccessGuard)
  async getTotals(@Query() query: RequestQueryDto) {
    const response = await this.nycService.getTotals(query);
    return response;
  }
}
