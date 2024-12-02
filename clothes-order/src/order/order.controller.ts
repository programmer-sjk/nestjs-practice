import { Body, Controller, Post } from '@nestjs/common';
import { AddClothesOrderRequest } from './dto/add-clothes-order-request';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/clothes')
  async addClothesOrder(@Body() request: AddClothesOrderRequest) {
    await this.orderService.addOrder(request);
  }

  // @Post('/clothes/return')
  // async returnClothes(@Body() request: ReturnOrderRequest) {}
}
