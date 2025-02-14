import { hash } from '../../../src/common/bcrypt';
import { User } from '../../../src/user/entities/user.entity';

export class UserFactory {
  private constructor() {}

  static of() {
    return User.of('test@gmail.com', hash('password'));
  }

  static from(email: string, password: string) {
    return User.of(email, hash(password));
  }
}
