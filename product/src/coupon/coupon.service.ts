import { Injectable } from '@nestjs/common';
import { CouponRepository } from './coupon.repository';
import { CouponRegisterRequest } from './dto/coupon-register.request';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async addCoupon(dto: CouponRegisterRequest) {
    await this.couponRepository.save(dto.toEntity());
  }
}
