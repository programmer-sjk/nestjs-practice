import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { ProductModule } from './product/product.module';
import { MerchantModule } from './merchant/merchant.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), ProductModule, MerchantModule],
})
export class AppModule {}
