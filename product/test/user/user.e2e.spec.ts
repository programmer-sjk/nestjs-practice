import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { setNestApp } from '../../src/common/set-nest-app';
import { CouponModule } from '../../src/coupon/coupon.module';
import { CouponRepository } from '../../src/coupon/repositories/coupon.repository';
import { PointModule } from '../../src/point/point.module';
import { SignUpRequest } from '../../src/user/dto/sign-up.request';
import { UserController } from '../../src/user/user.controller';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { CouponFactory } from '../fixture/entities/coupon-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('User E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let repository: UserRepository;
  let couponRepository: CouponRepository;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(testTypeormOptions),
        CouponModule,
        PointModule,
      ],
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    couponRepository = module.get<CouponRepository>(CouponRepository);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  describe('POST /v1/user', () => {
    it('사용자가 회원가입할 수 있다.', async () => {
      // given
      await couponRepository.save(CouponFactory.signUpCoupon());
      const requestDto = new SignUpRequest();
      requestDto.email = 'test@google.com';
      requestDto.password = 'password';

      // when
      await request(app.getHttpServer())
        .post('/v1/user')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(requestDto.email);
    });
  });
});
