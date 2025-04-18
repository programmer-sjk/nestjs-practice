import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  body: string;
}
