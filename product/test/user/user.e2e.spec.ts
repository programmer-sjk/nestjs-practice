import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { setNestApp } from '../../src/common/set-nest-app';
import { SignUpRequest } from '../../src/user/dto/sign-up.request';
import { UserController } from '../../src/user/user.controller';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { testConnectionOptions } from '../test-ormconfig';

describe('User E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let repository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions)],
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
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
