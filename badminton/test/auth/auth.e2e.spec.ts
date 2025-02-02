import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { SignInRequest } from '../../src/auth/dto/sigin-in.request';
import { hash } from '../../src/common/bcrypt';
import { setNestApp } from '../../src/common/set-nest-app';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { TestUserCreator } from '../fixture/entity/test-user-creator';
import { testConnectionOptions } from '../test-ormconfig';

describe('Auth E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        ConfigModule,
        UserModule,
      ],
      providers: [AuthService, JwtService],
      controllers: [AuthController],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  describe('POST /v1/auth', () => {
    it('email과 password가 일치하면 accessToken을 응답받는다.', async () => {
      // given
      const hashed = hash('password');
      const user = TestUserCreator.of('test@test.com', hashed);
      await userRepository.save(user);

      const requestDto = new SignInRequest();
      requestDto.email = 'test@test.com';
      requestDto.password = 'password';

      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
        );

      // when
      const response = await request(app.getHttpServer())
        .post('/v1/auth')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      expect(response.body.data.accessToken).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
      );
    });
  });
});
