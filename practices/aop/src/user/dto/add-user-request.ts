import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class AddUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  toEntity() {
    return User.of(this.name);
  }
}
