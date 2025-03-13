import { CouponUser } from '../../../src/coupon/entities/coupon-user.entity';

export class CouponUserFactory {
  private constructor() {}

  static create(couponId: number, userId: number) {
    return CouponUser.of(couponId, userId);
  }
}
