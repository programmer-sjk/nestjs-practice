import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CategoryService } from '../category/category.service';
import { DateUtil } from '../common/date-util';
import { ERROR } from '../common/err-message';
import { RedisService } from '../redis/redis.service';
import { CouponRegisterRequest } from './dto/coupon-register.request';
import { CouponUser } from './entities/coupon-user.entity';
import { Coupon } from './entities/coupon.entity';
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

  async giveCouponByLock(id: number, userId: number) {
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
      await this.addCouponToUser(coupon, userId);
    } catch (e) {
      throw e;
    } finally {
      await lock?.release();
    }
  }

  async giveCouponByIncr(id: number, userId: number) {
    const coupon = await this.couponRepository.findOneBy({ id });
    if (!coupon) {
      throw new BadRequestException('존재하지 않는 쿠폰입니다.');
    }

    const couponCount = await this.redisService.incr(`coupon:incr:${id}`);
    if (couponCount > coupon.originalStock) {
      throw new BadRequestException('쿠폰이 모두 소진되었습니다.');
    }

    coupon.updateStock(coupon.originalStock - couponCount);
    await this.addCouponToUser(coupon, userId);
  }

  async giveOneCouponToUser(id: number, userId: number) {
    const success = await this.redisService.sadd(`coupon:${id}`, userId);
    if (!success) {
      throw new BadRequestException('사용자에게 발급된 쿠폰입니다.');
    }

    const coupon = await this.couponRepository.findOneBy({ id });
    if (!coupon) {
      throw new BadRequestException('존재하지 않는 쿠폰입니다.');
    }

    const couponCount = await this.redisService.incr(`coupon:count:${id}`);
    if (couponCount > coupon.originalStock) {
      throw new BadRequestException('쿠폰이 모두 소진되었습니다.');
    }

    coupon.updateStock(coupon.originalStock - couponCount);
    await this.addCouponToUser(coupon, userId);
  }

  @Transactional()
  private async addCouponToUser(coupon: Coupon, userId: number) {
    await this.couponRepository.save(coupon);
    await this.couponUserRepository.save(CouponUser.of(coupon.id, userId));
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
    couponUser.unuse();
    await this.couponUserRepository.save(couponUser);
  }
}
