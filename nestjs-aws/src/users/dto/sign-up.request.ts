import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignUpRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  name: string;

  @IsNotEmpty()
  @MaxLength(32)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
