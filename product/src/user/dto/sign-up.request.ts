import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { hash } from '../../common/bcrypt';
import { User } from '../entities/user.entity';

export class SignUpRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  toEntity() {
    return User.of(this.email, hash(this.password));
  }
}
