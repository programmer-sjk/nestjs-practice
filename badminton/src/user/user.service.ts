import { Injectable } from '@nestjs/common';
import { UserRepository } from './../../../aop/src/user/user.repository';
import { SignUpRequest } from './dto/sign-up.request';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async addUser(dto: SignUpRequest) {
    await this.userRepository.save(dto.toEntity());
  }
}
