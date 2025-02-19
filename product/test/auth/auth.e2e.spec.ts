import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AdminRepository } from '../../src/admin/admin.repository';
import { AdminService } from '../../src/admin/admin.service';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { SignInRequest } from '../../src/auth/dto/sign-in.request';
import { SignInResponse } from '../../src/auth/dto/sign-in.response';
import { setNestApp } from '../../src/common/set-nest-app';
import { CouponModule } from '../../src/coupon/coupon.module';
import { PointModule } from '../../src/point/point.module';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { AdminFactory } from '../fixture/entities/admin-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('Auth E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let configService: ConfigService;
  let userRepository: UserRepository;
  let adminRepository: AdminRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        ConfigModule.forRoot(),
        CouponModule,
        PointModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        AdminService,
        JwtService,
        ConfigService,
        UserRepository,
        AdminRepository,
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    userRepository = module.get<UserRepository>(UserRepository);
    adminRepository = module.get<AdminRepository>(AdminRepository);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.clear();
    await adminRepository.clear();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  describe('POST /v1/auth/login', () => {
    it('사용자가 로그인 후 인증 토큰을 발급받을 수 있다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await userRepository.save(UserFactory.from(email, password));

      const requestDto = new SignInRequest();
      requestDto.email = email;
      requestDto.password = password;

      // when
      const response = await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send(requestDto)
        .expect(HttpStatus.OK);

      // then
      const result: SignInResponse = response.body.data;
      expect(result.accessToken).toBeTruthy();
    });
  });

  describe('POST /v1/auth/admin/login', () => {
    it('어드민이 로그인 후 인증 토큰을 발급받을 수 있다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await adminRepository.save(AdminFactory.from(email, password));

      const requestDto = new SignInRequest();
      requestDto.email = email;
      requestDto.password = password;

      // when
      const response = await request(app.getHttpServer())
        .post('/v1/auth/admin/login')
        .send(requestDto)
        .expect(HttpStatus.OK);

      // then
      const result: SignInResponse = response.body.data;
      expect(result.accessToken).toBeTruthy();
    });
  });
});
