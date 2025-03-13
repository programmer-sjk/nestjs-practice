import { Coupon } from '../../../src/coupon/entities/coupon.entity';
import { CouponType } from '../../../src/coupon/enums/coupon-type.enum';

export class CouponFactory {
  private constructor() {}

  static signUpCoupon() {
    return Coupon.of('신규회원 쿠폰', CouponType.PRICE, 1_000, -1);
  }

  static eventCoupon() {
    return Coupon.of('이벤트 쿠폰', CouponType.PRICE, 1_000, 10);
  }
}
