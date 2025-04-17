import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveBoardRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  id: number;
}
