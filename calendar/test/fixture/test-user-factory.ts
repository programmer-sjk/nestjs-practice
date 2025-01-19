import { User } from '../../src/user/entities/user.entity';

export class TestUserFactory {
  private constructor() {}

  static of(name: string) {
    return User.of(name);
  }
}
