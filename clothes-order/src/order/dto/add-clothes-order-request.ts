import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Order } from '../entities/order.entity';
import { DeliveryStatus } from '../enum/delivery-status.enum';
import { OrderStatus } from '../enum/order-status.enum';
import { StoreStatus } from '../enum/store-status.enum';
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

  toEntity(
    customer: Customer,
    price: number,
    status: OrderStatus,
    deliveryStatus: DeliveryStatus,
    storeStatus: StoreStatus,
  ) {
    const order = Order.of(
      customer,
      price,
      status,
      deliveryStatus,
      storeStatus,
    );

    const orderItems = this.orderItemDtos.map((dto) => dto.toEntity(order));
    order.updateOrderItems(orderItems);
    return order;
  }
}
