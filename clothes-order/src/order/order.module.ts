import { Module } from '@nestjs/common';
import { CustomerModule } from './../customer/customer.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [CustomerModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {}
