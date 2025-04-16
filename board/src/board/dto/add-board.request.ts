import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class AddBoardRequest {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  body: string;
}