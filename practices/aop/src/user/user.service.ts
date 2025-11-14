import { Injectable } from '@nestjs/common';
import { Cacheable } from '../common/decorators/cache-decorator';
import { AddUserRequest } from './dto/add-user-request';
import { UserRepository } from './user.repository';

@Cacheable({ key: 'user', ttl: 60 })
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // @LogDecorator()
  @Cacheable({ key: 'user', ttl: 10 * 1000 })
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
