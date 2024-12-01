import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemType } from '../enum/order-item-type.enum';
import { Order } from './../entities/order.entity';

export class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  type: OrderItemType;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  toEntity(order: Order) {
    return OrderItem.of(
      order,
      this.type,
      this.category,
      this.subCategory,
      this.count,
    );
  }
}
