import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserRepository } from './repositories/user.repository';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }

  async uploadProfile() {}
}
