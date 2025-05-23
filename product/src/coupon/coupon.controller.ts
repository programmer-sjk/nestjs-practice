import { Body, Controller, Param, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from '../common/response-entity';
import { CouponService } from './coupon.service';
import { CouponRegisterRequest } from './dto/coupon-register.request';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Roles(Role.USER)
  @Post(':couponId')
  async giveCouponToUser(
    @Param('couponId') couponId: number,
    @Body('userId') userId: number,
  ) {
    try {
      await this.couponService.giveCouponByLock(couponId, userId);
      return ResponseEntity.OK();
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async register(@Body() request: CouponRegisterRequest) {
    try {
      await this.couponService.addCoupon(request);
      return ResponseEntity.OK();
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }
}
