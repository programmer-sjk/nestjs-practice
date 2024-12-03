import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseEntity } from '../common/response-entity';
import { AddOrderRequest } from './dto/add-order-request';
import { OrderResponse } from './dto/order-response';
import { ReturnOrderRequest } from './dto/return-order-request';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({ isArray: true, type: OrderResponse })
  @Get()
  async orders(): Promise<ResponseEntity<OrderResponse[] | string>> {
    const userId = 1;
    try {
      const orders = await this.orderService.findOrders(userId);
      return ResponseEntity.OK(orders);
    } catch (e) {
      return ResponseEntity.ERROR(e.message);
    }
  }

  @Post()
  async addOrder(
    @Body() request: AddOrderRequest,
  ): Promise<ResponseEntity<string>> {
    const userId = 1;
    await this.orderService.addOrder(userId, request);
    return ResponseEntity.OK();
  }

  @Post('/return')
  async returnOrder(
    @Body() request: ReturnOrderRequest,
  ): Promise<ResponseEntity<string>> {
    const userId = 1;
    await this.orderService.returnClothes(userId, request);
    return ResponseEntity.OK();
  }
}
