import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { DateUtil } from '../common/date-util';
import { ERROR } from '../common/err-message';
import { CouponRegisterRequest } from './dto/coupon-register.request';
import { CouponUser } from './entities/coupon-user.entity';
import { CouponUserRepository } from './repositories/coupon-user.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Injectable()
export class CouponService {
  private readonly SIGN_UP_COUPON_NAME = '신규회원 쿠폰';
  private readonly COUPON_CAN_USE = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly couponRepository: CouponRepository,
    private readonly couponUserRepository: CouponUserRepository,
  ) {}

  async findUserCoupon(id: number, userId: number) {
    return this.couponRepository.findOne({
      where: { id, couponUsers: { userId, isUsed: this.COUPON_CAN_USE } },
      relations: ['couponUsers'],
    });
  }

  async addCoupon(dto: CouponRegisterRequest) {
    await this.validateCategory(dto.categoryId);
    await this.couponRepository.save(dto.toEntity());
  }

  private async validateCategory(categoryId?: number) {
    if (!categoryId) {
      return;
    }

    const category = await this.categoryService.findOneById(categoryId);
    if (!category) {
      throw new BadRequestException(ERROR.categoryNotFound);
    }
  }

  async addSignUpCoupon(userId: number) {
    const coupon = await this.couponRepository.findOneBy({
      name: this.SIGN_UP_COUPON_NAME,
    });
    await this.couponUserRepository.save(CouponUser.of(coupon.id, userId));
  }

  async useCoupon(couponId: number, userId: number) {
    const couponUser = await this.couponUserRepository.findOneBy({
      couponId,
      userId,
    });
    couponUser.use(DateUtil.nowDate());
    await this.couponUserRepository.save(couponUser);
  }
}
