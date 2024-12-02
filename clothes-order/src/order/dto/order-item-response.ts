import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ example: 1, description: '주문 아이템 id' })
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty({ enum: OrderItemStatus, description: '주문 아이템 상태' })
  @Expose()
  get status(): OrderItemStatus {
    return this._status;
  }

  @ApiProperty({ enum: OrderItemType, description: '주문 아이템 타입' })
  @Expose()
  get type(): OrderItemType {
    return this._type;
  }

  @ApiProperty({
    example: 'One Of [TOP, BOTTOM, SOCKS, CAP, PANTS]',
    description: '카테고리',
  })
  @Expose()
  get category(): string {
    return this._category;
  }

  @ApiProperty({
    example: 'One Of [T-SHIRTS, SHIRTS, SWEATER, PADDING, JEAN]',
    description: '하위 카테고리',
  })
  @Expose()
  get subCategory(): string {
    return this._subCategory;
  }

  @ApiProperty({ example: 1, description: '동일한 하위 카테고리일 때 개수' })
  @Expose()
  get count(): number {
    return this._count;
  }
}
