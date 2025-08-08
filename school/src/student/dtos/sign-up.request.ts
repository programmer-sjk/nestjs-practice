import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Student } from '../entities/student.entity';
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
    return Student.of(
      this.name,
      this.email,
      this.password,
      this.address.toEntity(),
    );
  }
}
