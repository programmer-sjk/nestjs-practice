import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponRepository } from './coupon.repository';
import { CouponService } from './coupon.service';

@Module({
  providers: [CouponService, CouponRepository],
  controllers: [CouponController],
})
export class CouponModule {}
