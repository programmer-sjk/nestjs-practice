import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { MerchantModule } from './merchant/merchant.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(connectionOptions),
    ProductModule,
    MerchantModule,
    AuthModule,
    StoreModule,
  ],
})
export class AppModule {}
