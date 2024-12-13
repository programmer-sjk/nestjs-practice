import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    CustomerModule,
    OrderModule,
    StoreModule,
  ],
})
export class AppModule {}
