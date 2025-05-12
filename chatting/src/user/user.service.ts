import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }
}
