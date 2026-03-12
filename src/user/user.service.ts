import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../common/database/user/repository/user.repository';
import { UserReadModel } from './models/user-read.model';
import { UserListResponseDto } from './dto/response/user-list.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserReadModel[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findAllAsDto(): Promise<UserListResponseDto[]> {
    try {
      const users = await this.userRepository.findAll();
      return users.map((u) => UserListResponseDto.fromModel(u));
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  // async findById(id: string): Promise<UserReadModel> {
  //   try {
  //     const user = await this.userRepository.findById(id);

  //     if (!user) {
  //       throw new NotFoundException(`User with id ${id} not found`);
  //     }

  //     return user;
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Failed to retrieve user');
  //   }
  // }
}