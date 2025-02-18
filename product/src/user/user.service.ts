import { Injectable } from '@nestjs/common';
import { CouponService } from '../coupon/coupon.service';
import { PointService } from '../point/point.service';
import { SignUpRequest } from './dto/sign-up.request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly couponService: CouponService,
    private readonly pointService: PointService,
    private readonly userRepository: UserRepository,
  ) {}

  async findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async addUser(dto: SignUpRequest) {
    const user = await this.userRepository.save(dto.toEntity());
    await this.couponService.addSignUpCoupon(user.id);
    await this.pointService.addSignUpPointToUser(user.id);
  }
}
