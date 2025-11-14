import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordRequest {
  @IsNotEmpty()
  @IsString()
  password: string;
}
