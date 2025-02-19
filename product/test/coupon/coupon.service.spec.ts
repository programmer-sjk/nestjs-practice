import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponModule } from '../../src/coupon/coupon.module';
import { CouponService } from '../../src/coupon/coupon.service';
import { CouponRegisterRequest } from '../../src/coupon/dto/coupon-register.request';
import { CouponType } from '../../src/coupon/enums/coupon-type.enum';
import { CouponUserRepository } from '../../src/coupon/repositories/coupon-user.repository';
import { CouponRepository } from '../../src/coupon/repositories/coupon.repository';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { CouponFactory } from '../fixture/entities/coupon-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('CouponService', () => {
  let module: TestingModule;
  let service: CouponService;
  let repository: CouponRepository;
  let couponUserRepository: CouponUserRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
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
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
