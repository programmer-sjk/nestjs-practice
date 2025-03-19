import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(id: number) {
    return this.userRepository.findBy({ id });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async signUp(dto: SignUpRequest) {
    await this.userRepository.save(dto.toEntity());
  }
}
