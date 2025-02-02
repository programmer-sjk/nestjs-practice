import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { setNestApp } from '../../src/common/set-nest-app';
import { SignUpRequest } from '../../src/user/dto/sign-up.request';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { testConnectionOptions } from '../test-ormconfig';
import { UserController } from './../../src/user/user.controller';

describe('UserController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let service: UserService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), UserModule],
      controllers: [UserController],
    }).compile();

    service = module.get<UserService>(UserService);
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

  describe('POST /v1/user', () => {
    it('사용자를 등록할 수 있다.', async () => {
      // given
      const requestDto = new SignUpRequest();
      requestDto.name = 'name';
      requestDto.email = 'test@test.com';
      requestDto.password = 'password';

      // when
      await request(app.getHttpServer())
        .post('/v1/user')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const user = await userRepository.find();
      expect(user[0].name).toBe(requestDto.name);
      expect(user[0].email).toBe(requestDto.email);
      expect(user[0].password).toBeTruthy();
    });
  });
});
