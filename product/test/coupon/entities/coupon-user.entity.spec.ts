import { BadRequestException } from '@nestjs/common';
import { CouponUser } from './../../../src/coupon/entities/coupon-user.entity';

describe('CouponUser', () => {
  describe('use', () => {
    it('쿠폰을 사용한다.', () => {
      // given
      const couponUser = new CouponUser();
      couponUser.isUsed = false;

      // when
      couponUser.use(new Date());

      // then
      expect(couponUser.isUsed).toBe(true);
    });

    it('유효기간이 지난 쿠폰은 사용할 수 없다.', () => {
      // given
      const couponUser = new CouponUser();
      couponUser.expiredAt = new Date('2020-01-01');

      // when & then
      expect(() => couponUser.use(new Date())).toThrowError(
        new BadRequestException('유효기간이 만료된 쿠폰입니다.'),
      );
    });
  });

  describe('unuse', () => {
    it('쿠폰 사용을 취소한다..', () => {
      // given
      const couponUser = new CouponUser();
      couponUser.isUsed = true;

      // when
      couponUser.unuse();

      // then
      expect(couponUser.isUsed).toBe(false);
    });
  });
});
