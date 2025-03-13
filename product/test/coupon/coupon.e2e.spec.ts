import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { AdminRepository } from '../../src/admin/admin.repository';
import { AdminService } from '../../src/admin/admin.service';
import { AuthService } from '../../src/auth/auth.service';
import { AuthGuard } from '../../src/auth/guards/auth.guard';
import { CategoryModule } from '../../src/category/category.module';
import { setNestApp } from '../../src/common/set-nest-app';
import { CouponController } from '../../src/coupon/coupon.controller';
import { CouponService } from '../../src/coupon/coupon.service';
import { CouponRegisterRequest } from '../../src/coupon/dto/coupon-register.request';
import { CouponType } from '../../src/coupon/enums/coupon-type.enum';
import { CouponUserRepository } from '../../src/coupon/repositories/coupon-user.repository';
import { CouponRepository } from '../../src/coupon/repositories/coupon.repository';
import { PointService } from '../../src/point/point.service';
import { PointHistoryRepository } from '../../src/point/repositories/point-history.repository';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { SignInRequestFactory } from '../fixture/dto/sign-in-request-factory';
import { AdminFactory } from '../fixture/entities/admin-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('Coupon E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let authService: AuthService;
  let repository: CouponRepository;
  let couponUserRepository: CouponUserRepository;
  let adminRepository: AdminRepository;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(testTypeormOptions),
        ConfigModule.forRoot(),
        CategoryModule,
      ],
      providers: [
        CouponService,
        CouponRepository,
        CouponUserRepository,
        AuthService,
        AdminService,
        PointService,
        PointHistoryRepository,
        AdminRepository,
        UserService,
        JwtService,
        UserRepository,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
      controllers: [CouponController],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get<CouponRepository>(CouponRepository);
    couponUserRepository =
      module.get<CouponUserRepository>(CouponUserRepository);
    adminRepository = module.get<AdminRepository>(AdminRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await repository.clear();
    await adminRepository.clear();
    await couponUserRepository.clear();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  describe('POST /v1/coupon', () => {
    it('어드민은 쿠폰을 등록할 수 있다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await adminRepository.save(AdminFactory.from(email, password));

      const signInResponse = await authService.adminSignIn(
        SignInRequestFactory.of(email, password),
      );

      const requestDto = new CouponRegisterRequest();
      requestDto.name = '2/17 이벤트 쿠폰';
      requestDto.type = CouponType.PRICE;
      requestDto.value = 5_000;
      requestDto.stock = 50;

      // when
      await request(app.getHttpServer())
        .post('/v1/coupon')
        .set('Authorization', `Bearer ${signInResponse.accessToken}`)
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('2/17 이벤트 쿠폰');
      expect(result[0].type).toBe(CouponType.PRICE);
      expect(result[0].value).toBe(5_000);
      expect(result[0].stock).toBe(50);
    });

    it('어드민이 아니라면 쿠폰을 등록할 수 없다.', async () => {
      // given
      const requestDto = new CouponRegisterRequest();
      requestDto.name = '2/17 이벤트 쿠폰';
      requestDto.type = CouponType.PRICE;
      requestDto.value = 5_000;
      requestDto.stock = 50;

      // when & then
      await request(app.getHttpServer())
        .post('/v1/coupon')
        .send(requestDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
