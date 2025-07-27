import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { User } from '../entities/user.entity';
import { AddressRequest } from './address.request';

export class SignUpRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressRequest)
  address: AddressRequest;

  toEntity() {
    return User.of(
      this.name,
      this.email,
      this.password,
      this.address.toEntity(),
    );
  }
}
