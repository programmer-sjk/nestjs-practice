import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async addUser(dto: SignUpRequest) {
    await this.userRepository.save(dto.toEntity());
  }
}
