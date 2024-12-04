import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ReturnOrderRequest {
  @ApiProperty({
    type: Number,
    description: '세션 기능이 없으므로 client에게 받는 사용자 ID',
  })
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  customerId: number;

  @ApiProperty({
    isArray: true,
    type: Number,
    example: [33, 34, 41, 44],
    description: '반환할 주문 아이템 id 목록',
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  orderItemIds: number[];
}
