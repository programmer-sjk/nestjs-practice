import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseEntity } from '../common/response-entity';
import { AddOrderRequest } from './dto/add-order-request';
import { OrderResponse } from './dto/order-response';
import { OrdersRequest } from './dto/orders-request';
import { TakeOrderRequest } from './dto/take-order-request';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({ isArray: true, type: OrderResponse })
  @Get()
  async orders(
    @Body() request: OrdersRequest,
  ): Promise<ResponseEntity<OrderResponse[] | string>> {
    try {
      const orders = await this.orderService.findOrders(request.customerId);
      return ResponseEntity.OK(orders);
    } catch (e) {
      return ResponseEntity.ERROR(e.message);
    }
  }

  @Post()
  async addOrder(
    @Body() request: AddOrderRequest,
  ): Promise<ResponseEntity<string>> {
    await this.orderService.addOrder(request);
    return ResponseEntity.OK();
  }

  @Post('/return')
  async takeOrderItems(
    @Body() request: TakeOrderRequest,
  ): Promise<ResponseEntity<string>> {
    await this.orderService.takeOrderItems(request);
    return ResponseEntity.OK();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseEntity<string>> {
    await this.orderService.remove(id);
    return ResponseEntity.OK();
  }
}
