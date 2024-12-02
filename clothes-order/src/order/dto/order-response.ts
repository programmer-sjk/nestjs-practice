import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Order } from '../entities/order.entity';
import { OrderItemResponse } from './order-item-response';

export class OrderResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _customerId: number;
  @Exclude() private readonly _price: number;
  @Exclude() private readonly _orderItems: OrderItemResponse[];

  constructor(order: Order) {
    this._id = order.id;
    this._customerId = order.customerId;
    this._price = order.price;
    this._orderItems = order.orderItems.map(
      (item) => new OrderItemResponse(item),
    );
  }

  @ApiProperty({ example: 1, description: '주문 id' })
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty({ example: 1, description: '고객 id' })
  @Expose()
  get customerId(): number {
    return this._customerId;
  }

  @ApiProperty({ example: 1000, description: '주문 가격' })
  @Expose()
  get price(): number {
    return this._price;
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
