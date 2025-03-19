import { Injectable } from '@nestjs/common';
import { UserRepositoryAdaptor } from './adaptors/user-repository.adaptor';
import { SignUpRequest } from './dto/sign-up.request';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryAdaptor) {}

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
