import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class AddUserRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  mail: string;

  @IsNotEmpty()
  @IsPhoneNumber('KR')
  @MaxLength(11)
  phoneNumber: string;

  toEntity() {
    return User.of(this.name, this.mail, this.phoneNumber);
  }
}
