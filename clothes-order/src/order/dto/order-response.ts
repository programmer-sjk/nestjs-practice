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

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get customerId(): number {
    return this._customerId;
  }

  @Expose()
  get price(): number {
    return this._price;
  }

  @Expose()
  get orderItems(): OrderItemResponse[] {
    return this._orderItems;
  }
}
