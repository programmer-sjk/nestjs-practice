import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dtos/sign-up.request';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  private readonly CORRECT_NAME = '외계인';

  constructor(private readonly userRepository: UserRepository) {}

  findOneByName(name: string) {
    if (name !== this.CORRECT_NAME) {
      return;
    }

    return {
      id: 1,
      name: '외계인',
      password: 'password',
    };
  }

  signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }
}
