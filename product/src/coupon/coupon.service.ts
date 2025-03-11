import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CategoryService } from '../category/category.service';
import { DateUtil } from '../common/date-util';
import { ERROR } from '../common/err-message';
import { RedisService } from '../redis/redis.service';
import { CouponRegisterRequest } from './dto/coupon-register.request';
import { CouponUser } from './entities/coupon-user.entity';
import { CouponUserRepository } from './repositories/coupon-user.repository';
import { CouponRepository } from './repositories/coupon.repository';

@Injectable()
export class CouponService {
  private readonly SIGN_UP_COUPON_NAME = '신규회원 쿠폰';

  constructor(
    private readonly categoryService: CategoryService,
    private readonly redisService: RedisService,
    private readonly couponRepository: CouponRepository,
    private readonly couponUserRepository: CouponUserRepository,
  ) {}

  // Note. 사용자가 쿠폰을 이미 가지고 있는지 체크해야 하지만 테스트 용이성을 위해 스킵.
  @Transactional()
  async getCoupon(id: number, userId: number) {
    let lock;
    try {
      lock = await this.redisService.acquireLock(`get-coupon:${id}`);
      const coupon = await this.couponRepository.findOneBy({ id });
      if (!coupon) {
        throw new BadRequestException('존재하지 않는 쿠폰입니다.');
      }

      if (!coupon.hasStock()) {
        throw new BadRequestException('쿠폰이 모두 소진되었습니다.');
      }

      coupon.decreaseStock();
      await this.couponRepository.save(coupon);
      await this.couponUserRepository.save(CouponUser.of(coupon.id, userId));
    } catch (e) {
      throw e;
    } finally {
      await lock?.release();
    }
  }

  async findUserCoupon(id: number, userId: number) {
    return this.couponRepository.findOne({
      where: { id, couponUsers: { userId } },
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

  async refundCoupon(couponId: number, userId: number) {
    const couponUser = await this.couponUserRepository.findOneBy({
      couponId,
      userId,
    });
    couponUser.cancelUsed();
    await this.couponUserRepository.save(couponUser);
  }
}
