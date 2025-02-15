import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { hash } from '../../common/bcrypt';
import { Admin } from '../entities/admin.entity';

export class AdminSignUpRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  toEntity() {
    return Admin.of(this.email, hash(this.password));
  }
}
