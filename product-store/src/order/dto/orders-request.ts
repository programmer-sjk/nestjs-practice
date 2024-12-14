import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrdersRequest {
  @ApiProperty({ type: Number, description: '세션 기능이 없으므로 client에게 받는 사용자 ID' })
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  customerId: number;
}
