import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveCommentRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;
}
