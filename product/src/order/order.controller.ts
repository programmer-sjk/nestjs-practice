import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AddOrderRequest } from './dto/add-order.request';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async order(@Body() request: AddOrderRequest) {
    await this.orderService.newOrder(request);
    return ResponseEntity.OK();
  }
}
