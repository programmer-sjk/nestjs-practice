import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async doLongQuery() {
    const user = new User();
    user.name = 'before down';
    const savedUser = await this.userRepository.save(user);
    await this.delay(8);
    savedUser.name = 'after down';
    await this.userRepository.save(user);
  }

  private async delay(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}
