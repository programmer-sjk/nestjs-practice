import { IsInt, IsNotEmpty } from 'class-validator';

export class PointPurchaseRequest {
  @IsNotEmpty()
  @IsInt()
  value: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
