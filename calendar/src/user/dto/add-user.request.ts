import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class AddUserRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;

  toEntity() {
    return User.of(this.name);
  }
}
