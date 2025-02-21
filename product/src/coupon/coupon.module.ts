import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponUserRepository } from './repositories/coupon-user.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  imports: [CategoryModule],
  providers: [CouponService, CouponRepository, CouponUserRepository],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
