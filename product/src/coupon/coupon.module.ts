import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponUserRepository } from './repositories/coupon-user.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  providers: [CouponService, CouponRepository, CouponUserRepository],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
