import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    UserModule,
    AdminModule,
    ProductModule,
    OrderModule,
    PointModule,
    CouponModule,
    AuthModule,
  ],
})
export class AppModule {}
