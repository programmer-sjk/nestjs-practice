import { Inject, Injectable } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async find(id: number) {
    return this.userRepository.findOneBy(id);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async signUp(dto: SignUpRequest) {
    await this.userRepository.save(dto);
  }

  async updatePassword(id: number, newPassword: string) {
    await this.userRepository.updatePassword(id, newPassword);
  }

  async remove(id: number) {
    await this.userRepository.remove(id);
  }
}
