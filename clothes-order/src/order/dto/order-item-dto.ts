import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { OrderItem } from '../entities/order-item.entity';
import { OrderItemType } from '../enum/order-item-type.enum';
import { Order } from './../entities/order.entity';

export class OrderItemDto {
  @ApiProperty({
    enum: OrderItemType,
    example: 'CLOTHES',
    description: '주문 아이템 타입',
  })
  @IsNotEmpty()
  @IsEnum(OrderItemType)
  type: OrderItemType;

  @ApiProperty({
    example: `One Of [TOP, BOTTOM, SOCKS, CAP, PANTS]`,
    description: '상의 카테고리',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    example: 'One Of [T-SHIRTS, SHIRTS, SWEATER, PADDING, JEAN]',
    description: '하위 카테고리',
  })
  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @ApiProperty({ example: 1, description: '동일한 하위 카테고리일 때 개수' })
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
