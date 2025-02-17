import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { CouponService } from './coupon.service';
import { CouponRegisterRequest } from './dto/coupon-register.request';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async reigster(@Body() request: CouponRegisterRequest) {
    await this.couponService.addCoupon(request);
    return ResponseEntity.OK();
  }
}
