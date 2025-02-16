import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  name: string;
}
