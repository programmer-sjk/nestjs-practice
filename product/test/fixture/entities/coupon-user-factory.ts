import { CouponUser } from '../../../src/coupon/entities/coupon-user.entity';

export class CouponUserFactory {
  private constructor() {}

  static of(couponId: number, userId: number) {
    return CouponUser.of(couponId, userId);
  }

  static createUsed(couponId: number, userId: number) {
    const couponUser = this.of(couponId, userId);
    couponUser.isUsed = true;
    return couponUser;
  }
}
