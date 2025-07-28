import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dtos/sign-up.request';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  private readonly CORRECT_NAME = '외계인';

  constructor(private readonly userRepository: UserRepository) {}

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }
}
