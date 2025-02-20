import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from '../common/response-entity';
import { AddOrderRequest } from './dto/add-order.request';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.USER)
  @Post()
  async order(@Body() request: AddOrderRequest) {
    await this.orderService.newOrder(request);
    return ResponseEntity.OK();
  }
}
