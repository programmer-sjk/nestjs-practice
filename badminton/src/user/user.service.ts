import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmailOrThrow(email: string) {
    const user = await  this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('등록되지 않은 사용자입니다.');
    }

    return user;
  }

  async addUser(dto: SignUpRequest) {
    await this.userRepository.save(dto.toEntity());
  }
}
