import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateBoardRequest {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  body: string;
}
