import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './repositories/user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }
}
