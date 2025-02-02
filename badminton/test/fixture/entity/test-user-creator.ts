import { User } from '../../../src/user/entities/user.entity';

export class TestUserCreator {
  private constructor() {}

  static of(email: string, password: string) {
    return User.of('name', email, password);
  }
}
