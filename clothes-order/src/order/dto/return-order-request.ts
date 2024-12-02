import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class ReturnOrderRequest {
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  orderItemIds: number[];
}
