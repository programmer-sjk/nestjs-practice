import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllBoardRequest {
  @IsNotEmpty()
  @IsInt()
  limit: number;

  @IsOptional()
  @IsInt()
  offset?: number;
}
