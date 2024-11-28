import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { RequestQueryDto } from './dtos/request-query.dto';

@Injectable()
export class NycService {
  protected readonly logger = new Logger(NycService.name);

  constructor(private readonly http: HttpService) {}

  async getTotals(filter: RequestQueryDto) {
    let query = `SELECT COUNT(*) AS total_trips, SUM(passenger_count) AS total_passengers, 
                  SUM(fare_amount) AS total_fare, AVG(fare_amount) AS avg_fare`;

    if (filter.start || filter.end) {
      const dateFilter = await this.filter('pickup_datetime', filter);
      query += ` WHERE ${dateFilter}`;
    }

    try {
      const request = this.http.get(`?$query=${query}`);
      const { data } = await lastValueFrom(request);
      return data[0];
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async filter(field: string, date: RequestQueryDto): Promise<string> {
    if (date.start && date.end) {
      return `${field} >= '${date.start}' AND ${field} <= '${date.end}'`;
    } else if (date.start) {
      return `${field} >= '${date.start}'`;
    } else if (date.end) {
      return `${field} <= '${date.end}'`;
    }
  }
}
