import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
