import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePostRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  id: number;

  @IsNotEmpty()
  @Type(() => Number)
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
