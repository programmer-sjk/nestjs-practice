import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class ReturnOrderRequest {
  @ApiProperty({
    example: [33, 34, 41, 44],
    description: '반환할 주문 아이템 id 목록',
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  orderItemIds: number[];
}
