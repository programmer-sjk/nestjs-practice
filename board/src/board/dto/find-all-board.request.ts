import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllBoardRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset?: number;
}
