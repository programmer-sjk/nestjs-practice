import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
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
    return User.of(this.email, this.password);
  }
}
