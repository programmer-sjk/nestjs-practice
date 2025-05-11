import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { hash } from '../../common/bcrypt';
import { User } from '../entities/user.entity';

export class SignUpRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  email: string;

  @IsNotEmpty()
  @MaxLength(11)
  @IsPhoneNumber('KR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  toEntity() {
    return User.of(
      this.name,
      this.email,
      this.phoneNumber,
      hash(this.password),
    );
  }
}
