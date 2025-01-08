import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
}
