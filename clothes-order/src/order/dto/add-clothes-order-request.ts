import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { Order } from '../entities/order.entity';
import { OrderType } from '../enum/order-type.enum';
import { Customer } from './../../customer/entities/customer.entity';
import { OrderItemDto } from './order-item-dto';

export class AddClothesOrderRequest {
  @ApiProperty({ enum: OrderType, description: '주문 타입' })
  @IsNotEmpty()
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({ isArray: true, type: OrderItemDto })
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
