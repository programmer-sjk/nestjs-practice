import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { StoreModule } from './store/store.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [CustomerModule, OrderModule, StoreModule, BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
