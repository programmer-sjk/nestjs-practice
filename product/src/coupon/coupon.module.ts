import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponRepository } from './repositories/coupon.repository';
import { CouponService } from './coupon.service';

@Module({
  providers: [CouponService, CouponRepository],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
