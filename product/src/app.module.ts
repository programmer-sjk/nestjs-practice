import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [UserModule, AdminModule, ProductModule, OrderModule, PointModule, CouponModule],
})
export class AppModule {}
