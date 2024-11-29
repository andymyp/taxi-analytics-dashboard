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

  async totalTrips(filter: RequestQueryDto): Promise<number> {
    try {
      const $select = `count(*) as totalTrips`;
      const $where = await this.filter('pickup_datetime', filter);

      const { data } = await lastValueFrom(
        this.http.get('/gkne-dk5s.json', {
          params: { $select, $where },
        }),
      );

      return data[0].totalTrips;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async totalPassengers(filter: RequestQueryDto): Promise<number> {
    try {
      const $select = `sum(passenger_count) as totalPassengers`;
      const $where = await this.filter('pickup_datetime', filter);

      const { data } = await lastValueFrom(
        this.http.get('/gkne-dk5s.json', {
          params: { $select, $where },
        }),
      );

      return data[0].totalPassengers;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async totalFare(filter: RequestQueryDto): Promise<number> {
    try {
      const $select = `sum(fare_amount) as totalFare`;
      const $where = await this.filter('pickup_datetime', filter);

      const { data } = await lastValueFrom(
        this.http.get('/gkne-dk5s.json', {
          params: { $select, $where },
        }),
      );

      return data[0].totalFare;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async avgFare(filter: RequestQueryDto): Promise<number> {
    try {
      const $select = `avg(fare_amount) as avgFare`;
      const $where = await this.filter('pickup_datetime', filter);

      const { data } = await lastValueFrom(
        this.http.get('/gkne-dk5s.json', {
          params: { $select, $where },
        }),
      );

      return data[0].avgFare;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async filter(field: string, date: RequestQueryDto): Promise<string> {
    if (date.start && date.end) {
      return `${field} >= '${date.start}' and ${field} <= '${date.end}'`;
    } else if (date.start) {
      return `${field} >= '${date.start}'`;
    } else if (date.end) {
      return `${field} <= '${date.end}'`;
    }

    return undefined;
  }
}
