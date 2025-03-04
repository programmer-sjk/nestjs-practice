import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from '../common/response-entity';
import { AddOrderRequest } from './dto/add-order.request';
import { RefundRequest } from './dto/refund.request';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.USER)
  @Post()
  async order(@Body() request: AddOrderRequest) {
    try {
      await this.orderService.newOrder(request);
      return ResponseEntity.OK();
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }

  @Roles(Role.USER)
  @Post()
  async refund(@Body() request: RefundRequest) {
    try {
      await this.orderService.refund(request);
      return ResponseEntity.OK();
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }
}
