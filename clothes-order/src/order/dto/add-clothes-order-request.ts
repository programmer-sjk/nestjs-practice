import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Order } from '../entities/order.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { OrderItemDto } from './order-item-dto';

export class AddClothesOrderRequest {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => OrderItemDto)
  @IsArray()
  orderItemDtos: OrderItemDto[];

  toEntity(customer: Customer) {
    const order = Order.createNew(customer);

    const orderItems = this.orderItemDtos.map((dto) => dto.toEntity(order));
    order.updateOrderItems(orderItems);
    return order;
  }
}
