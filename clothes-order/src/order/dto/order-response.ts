import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enum/order-status.enum';
import { OrderItemResponse } from './order-item-response';

export class OrderResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _status: OrderStatus;
  @Exclude() private readonly _orderItems: OrderItemResponse[];

  constructor(order: Order) {
    this._id = order.id;
    this._orderItems = order.orderItems.map(
      (item) => new OrderItemResponse(item),
    );
  }

  @ApiProperty({ example: 1, description: '주문 id' })
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty({ enum: OrderStatus, description: '주문 상태' })
  @Expose()
  get status(): OrderStatus {
    return this._status;
  }

  @ApiProperty({
    isArray: true,
    type: OrderItemResponse,
    description: '주문 아이템 상세',
  })
  @Expose()
  get orderItems(): OrderItemResponse[] {
    return this._orderItems;
  }
}
