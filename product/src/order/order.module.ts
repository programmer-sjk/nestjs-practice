import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [UserModule, ProductModule],
  providers: [OrderService, OrderRepository],
  controllers: [OrderController],
})
export class OrderModule {}
