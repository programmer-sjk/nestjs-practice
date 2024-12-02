import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddClothesOrderRequest } from './dto/add-clothes-order-request';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async orders() {
    const userId = 1;
    return this.orderService.findOrders(userId);
  }

  @Post()
  async addOrder(@Body() request: AddClothesOrderRequest) {
    const userId = 1;
    await this.orderService.addOrder(userId, request);
  }

  // @Post('/return')
  // async returnOrder(@Body() request: ReturnOrderRequest) {}
}
