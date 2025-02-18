import { Injectable } from '@nestjs/common';
import { CouponRegisterRequest } from './dto/coupon-register.request';
import { CouponUser } from './entities/coupon-user.entity';
import { CouponUserRepository } from './repositories/coupon-user.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Injectable()
export class CouponService {
  private readonly SIGN_UP_COUPON_NAME = '신규회원 쿠폰';

  constructor(
    private readonly couponRepository: CouponRepository,
    private readonly couponUserRepository: CouponUserRepository,
  ) {}

  async addCoupon(dto: CouponRegisterRequest) {
    await this.couponRepository.save(dto.toEntity());
  }

  async addSignUpCoupon(userId: number) {
    const coupon = await this.couponRepository.findOneBy({
      name: this.SIGN_UP_COUPON_NAME,
    });
    await this.couponUserRepository.save(CouponUser.of(coupon.id, userId));
  }
}
