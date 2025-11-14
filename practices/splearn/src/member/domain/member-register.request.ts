import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MemberRegisterRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
