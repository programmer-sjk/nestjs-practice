import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { CouponModule } from '../../src/coupon/coupon.module';
import { CouponService } from '../../src/coupon/coupon.service';
import { CouponRegisterRequest } from '../../src/coupon/dto/coupon-register.request';
import { CouponUser } from '../../src/coupon/entities/coupon-user.entity';
import { CouponType } from '../../src/coupon/enums/coupon-type.enum';
import { CouponUserRepository } from '../../src/coupon/repositories/coupon-user.repository';
import { CouponRepository } from '../../src/coupon/repositories/coupon.repository';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { CouponFactory } from '../fixture/entities/coupon-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('CouponService', () => {
  let module: TestingModule;
  let service: CouponService;
  let repository: CouponRepository;
  let couponUserRepository: CouponUserRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(testTypeormOptions),
        CouponModule,
        UserModule,
      ],
    }).compile();

    service = module.get<CouponService>(CouponService);
    repository = module.get<CouponRepository>(CouponRepository);
    couponUserRepository =
      module.get<CouponUserRepository>(CouponUserRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  beforeEach(async () => {
    await repository.clear();
    await userRepository.clear();
    await couponUserRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('giveCouponToUser', () => {
    it('쿠폰을 사용자에게 발급할 수 있다.', async () => {
      // given
      const coupon = await repository.save(CouponFactory.signUpCoupon());
      const user = await userRepository.save(UserFactory.of());

      // when
      await service.giveCouponToUser(coupon.id, user.id);

      // then
      const result = await couponUserRepository.find();
      expect(result[0].couponId).toBe(coupon.id);
      expect(result[0].userId).toBe(user.id);
    });

    it('여러 사용자가 쿠폰 획득시 재고는 차례대로 감소한다.', async () => {
      // given
      const coupon = await repository.save(CouponFactory.eventCoupon());
      const user = await userRepository.save(UserFactory.of());

      let functions = [];
      for (let i = 0; i < 100; i++) {
        functions.push(service.giveCouponToUser(coupon.id, user.id));
      }

      // when
      await Promise.all(functions);

      // then
      const savedCouponUsers = await couponUserRepository.find();
      expect(savedCouponUsers.length).toBe(100);

      const saveCoupon = await repository.findOneBy({ id: coupon.id });
      expect(saveCoupon.stock).toBe(0);
    });
  });

  describe('findUserCoupon', () => {
    it('사용자의 쿠폰을 조회할 수 있다.', async () => {
      // given
      const coupon = await repository.save(CouponFactory.signUpCoupon());
      const user = await userRepository.save(UserFactory.of());

      // when
      const result = await service.findUserCoupon(coupon.id, user.id);

      // then
      const couponUser = result.couponUsers[0];
      expect(couponUser.couponId).toBe(coupon.id);
      expect(couponUser.userId).toBe(user.id);
    });
  });

  describe('addCoupon', () => {
    it('쿠폰을 추가할 수 있다.', async () => {
      // given
      const dto = new CouponRegisterRequest();
      dto.name = '2/17 이벤트 쿠폰';
      dto.type = CouponType.PRICE;
      dto.value = 5_000;
      dto.stock = 50;

      // when
      await service.addCoupon(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('2/17 이벤트 쿠폰');
      expect(result[0].type).toBe(CouponType.PRICE);
      expect(result[0].value).toBe(5_000);
      expect(result[0].stock).toBe(50);
    });
  });

  describe('addSignUpCoupon', () => {
    it('신규 회원에 대한 쿠폰을 추가할 수 있다.', async () => {
      // given
      const signUpCoupon = await repository.save(CouponFactory.signUpCoupon());
      const user = await userRepository.save(UserFactory.of());

      // when
      await service.addSignUpCoupon(user.id);

      // then
      const result = await couponUserRepository.find();
      expect(result).toHaveLength(1);
      expect(result[0].couponId).toBe(signUpCoupon.id);
      expect(result[0].userId).toBe(user.id);
    });
  });

  describe('useCoupon', () => {
    it('사용자가 쿠폰을 사용할 수 있다.', async () => {
      // given
      const signUpCoupon = await repository.save(CouponFactory.signUpCoupon());
      const user = await userRepository.save(UserFactory.of());
      await couponUserRepository.save(CouponUser.of(signUpCoupon.id, user.id));

      // when
      await service.useCoupon(signUpCoupon.id, user.id);

      // then
      const result = await couponUserRepository.find();
      expect(result).toHaveLength(1);
      expect(result[0].isUsed).toBe(true);
    });
  });

  describe('refundCoupon', () => {
    it('사용한 쿠폰을 취소할 수 있다.', async () => {
      // given
      const signUpCoupon = await repository.save(CouponFactory.signUpCoupon());
      const user = await userRepository.save(UserFactory.of());
      await couponUserRepository.save(CouponUser.of(signUpCoupon.id, user.id));

      // when
      await service.refundCoupon(signUpCoupon.id, user.id);

      // then
      const result = await couponUserRepository.find();
      expect(result).toHaveLength(1);
      expect(result[0].isUsed).toBe(false);
    });
  });
});
