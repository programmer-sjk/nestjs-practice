import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
