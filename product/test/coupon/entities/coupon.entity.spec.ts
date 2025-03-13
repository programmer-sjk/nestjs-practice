import { BadRequestException } from '@nestjs/common';
import { Coupon } from '../../../src/coupon/entities/coupon.entity';

describe('Coupon', () => {
  describe('hasStock', () => {
    it('쿠폰의 재고가 있는지 확인한다.', () => {
      // given
      const couponUser = new Coupon();
      couponUser.stock = 1;

      // when
      const result = couponUser.hasStock();

      // then
      expect(result).toBe(true);
    });

    it('쿠폰의 재고가 없을 수 있다.', () => {
      // given
      const couponUser = new Coupon();
      couponUser.stock = 0;

      // when
      const result = couponUser.hasStock();

      // then
      expect(result).toBe(false);
    });
  });

  describe('decreaseStock', () => {
    it('쿠폰 재고를 감소시킨다.', () => {
      // given
      const couponUser = new Coupon();
      couponUser.stock = 1;

      // when
      couponUser.decreaseStock();

      // then
      expect(couponUser.stock).toBe(0);
    });

    it('쿠폰 재고가 없는 경우 감소시키면 예외가 발생한다.', () => {
      // given
      const couponUser = new Coupon();
      couponUser.stock = 0;

      // when & then
      expect(() => couponUser.decreaseStock()).toThrowError(
        new BadRequestException('쿠폰 재고가 없습니다.'),
      );
    });
  });
});
