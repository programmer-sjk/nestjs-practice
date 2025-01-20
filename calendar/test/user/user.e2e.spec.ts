import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { setNestApp } from '../../src/common/set-nest-app';
import { AddUserRequest } from '../../src/user/dto/add-user.request';
import { UserController } from '../../src/user/user.controller';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { testTypeormOptions } from '../test-ormconfig';

describe('UserController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let repository: UserRepository;

  beforeAll(async () => {
    initializeTransactionalContext();
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(testTypeormOptions)],
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  beforeEach(async () => {
    await repository.clear();
  });

  describe('POST /user', () => {
    it('사용자를 등록할 수 있다.', async () => {
      // given
      const requestDto = new AddUserRequest();
      requestDto.name = '서정국';
      requestDto.mail = 'test@google.com';
      requestDto.phoneNumber = '01012345678';

      // when
      await request(app.getHttpServer())
        .post('/v1/user')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const user = await repository.find();
      expect(user[0].name).toBe('서정국');
    });
  });
});
