import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { CouponModule } from '../../src/coupon/coupon.module';
import { CouponUserRepository } from '../../src/coupon/repositories/coupon-user.repository';
import { CouponRepository } from '../../src/coupon/repositories/coupon.repository';
import { PointModule } from '../../src/point/point.module';
import { PointRepository } from '../../src/point/repositories/point.repository';
import { SignUpRequest } from '../../src/user/dto/sign-up.request';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { CouponFactory } from '../fixture/entities/coupon-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  let repository: UserRepository;
  let couponRepository: CouponRepository;
  let couponUserRepository: CouponUserRepository;
  let pointRepository: PointRepository;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(testTypeormOptions),
        UserModule,
        CouponModule,
        PointModule,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
    couponRepository = module.get<CouponRepository>(CouponRepository);
    couponUserRepository =
      module.get<CouponUserRepository>(CouponUserRepository);
    pointRepository = module.get<PointRepository>(PointRepository);
  });

  beforeEach(async () => {
    await repository.clear();
    await couponRepository.clear();
    await couponUserRepository.clear();
    await pointRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('id로 사용자를 조회할 수 있다.', async () => {
      // given
      const email = 'test@google.com';
      const password = 'password';
      const user = await repository.save(UserFactory.from(email, password));

      // when
      const result = await service.findOneByIdOrThrow(user.id);

      // then
      expect(result.email).toBe(email);
    });
  });

  describe('findOneByEmail', () => {
    it('email로 사용자를 조회할 수 있다.', async () => {
      // given
      const email = 'test@google.com';
      const password = 'password';
      await repository.save(UserFactory.from(email, password));

      // when
      const result = await service.findOneByEmail(email);

      // then
      expect(result.email).toBe(email);
    });
  });

  describe('addUser', () => {
    it('사용자를 추가할 수 있다.', async () => {
      // given
      await couponRepository.save(CouponFactory.signUpCoupon());
      const dto = new SignUpRequest();
      dto.email = 'test@google.com';
      dto.password = 'password';

      // when
      await service.addUser(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(dto.email);
    });

    it('신규 사용자가 추가되면 포인트와 쿠폰이 발급된다.', async () => {
      // given
      await couponRepository.save(CouponFactory.signUpCoupon());
      const dto = new SignUpRequest();
      dto.email = 'test@google.com';
      dto.password = 'password';

      // when
      await service.addUser(dto);

      // then
      const result = await repository.find();
      const user = result[0];

      const coupon = await couponUserRepository.find();
      expect(coupon).toHaveLength(1);
      expect(coupon[0].userId).toBe(user.id);

      const point = await pointRepository.find();
      expect(point).toHaveLength(1);
      expect(point[0].userId).toBe(user.id);
    });
  });
});
