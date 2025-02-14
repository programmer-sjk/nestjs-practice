import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { SignInRequest } from '../../src/auth/dto/sign-in.request';
import { SignInResponse } from '../../src/auth/dto/sign-in.response';
import { setNestApp } from '../../src/common/set-nest-app';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('Auth E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let configService: ConfigService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        ConfigModule.forRoot(),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ConfigService,
        UserRepository,
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    userRepository = module.get<UserRepository>(UserRepository);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.clear();
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
});
