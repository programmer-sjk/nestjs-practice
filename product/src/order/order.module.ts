import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [UserModule, ProductModule],
  providers: [OrderService, OrderRepository, OrderItemRepository],
  controllers: [OrderController],
})
export class OrderModule {}
