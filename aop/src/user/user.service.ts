import { Injectable } from '@nestjs/common';
import { LogDecorator } from '../common/decorators/log-decorator';
import { AddUserRequest } from './dto/add-user-request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @LogDecorator()
  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async add(request: AddUserRequest) {
    await this.userRepository.save(request.toEntity());
  }

  async updateName(id: number, name: string) {
    await this.userRepository.update(id, { name });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
