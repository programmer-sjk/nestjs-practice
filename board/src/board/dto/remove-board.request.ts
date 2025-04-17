import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveBoardRequest {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
