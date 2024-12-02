import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReturnOrderRequest {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
