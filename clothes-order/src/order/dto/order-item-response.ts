import { Exclude, Expose } from 'class-transformer';
import { OrderItemStatus } from '../enum/order-item-status.enum';
import { OrderItemType } from '../enum/order-item-type.enum';
import { OrderItem } from './../entities/order-item.entity';

export class OrderItemResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _status: OrderItemStatus;
  @Exclude() private readonly _type: OrderItemType;
  @Exclude() private readonly _category: string;
  @Exclude() private readonly _subCategory: string;
  @Exclude() private readonly _count: number;

  constructor(item: OrderItem) {
    this._id = item.id;
    this._status = item.status;
    this._type = item.type;
    this._category = item.category;
    this._subCategory = item.subCategory;
    this._count = item.count;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get status(): OrderItemStatus {
    return this._status;
  }

  @Expose()
  get type(): OrderItemType {
    return this._type;
  }

  @Expose()
  get category(): string {
    return this._category;
  }

  @Expose()
  get subCategory(): string {
    return this._subCategory;
  }

  @Expose()
  get count(): number {
    return this._count;
  }
}
