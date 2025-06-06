import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RemovePostRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;
}
