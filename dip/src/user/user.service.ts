import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async signUp(dto: SignUpRequest) {
    await this.userRepository.save(dto.toEntity());
  }

  async updatePassword(id: number, newPassword: string) {
    const user = await this.find(id);
    user.updatePassword(newPassword);
    await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.find(id);
    await this.userRepository.remove(user);
  }
}
