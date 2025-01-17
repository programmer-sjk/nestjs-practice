import { Injectable } from '@nestjs/common';
import { AddUserRequest } from './dto/add-user.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async addUser(request: AddUserRequest) {
    await this.userRepository.save(request.toEntity());
  }
}
