import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBoardRequest {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
