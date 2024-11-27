import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  protected readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(user: Partial<User>): Promise<User> {
    try {
      const created = await this.userModel.create(user);
      return created;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: number): Promise<User> {
    const finded = await this.userModel.findByPk(id);
    return finded;
  }

  async findByEmail(email: string): Promise<User> {
    const finded = await this.userModel.findOne({ where: { email } });
    return finded;
  }
}
