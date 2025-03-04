import { IsInt, IsNotEmpty } from 'class-validator';

export class RefundRequest {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  orderId: number;
}
