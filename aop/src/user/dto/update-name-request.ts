import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateNameRequest {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
