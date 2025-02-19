import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponModule } from '../../src/coupon/coupon.module';
import { CouponRepository } from '../../src/coupon/repositories/coupon.repository';
import { CouponService } from '../../src/coupon/coupon.service';
import { CouponRegisterRequest } from '../../src/coupon/dto/coupon-register.request';
import { CouponType } from '../../src/coupon/enums/coupon-type.enum';
import { testConnectionOptions } from '../test-ormconfig';
import { CouponUserRepository } from '../../src/coupon/repositories/coupon-user.repository';

describe('CouponService', () => {
  let module: TestingModule;
  let service: CouponService;
  let repository: CouponRepository;
  let couponUserRepository: CouponUserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), CouponModule],
    }).compile();

    service = module.get<CouponService>(CouponService);
    repository = module.get<CouponRepository>(CouponRepository);
    couponUserRepository = module.get<CouponUserRepository>(CouponUserRepository);
  });

  beforeEach(async () => {
    await repository.clear();
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
});
