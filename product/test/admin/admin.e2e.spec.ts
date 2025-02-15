import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AdminController } from '../../src/admin/admin.controller';
import { AdminRepository } from '../../src/admin/admin.repository';
import { AdminService } from '../../src/admin/admin.service';
import { AdminSignUpRequest } from '../../src/admin/dto/admin-sign-up.request';
import { setNestApp } from '../../src/common/set-nest-app';
import { testConnectionOptions } from '../test-ormconfig';

describe('Admin E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let repository: AdminRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions)],
      controllers: [AdminController],
      providers: [AdminService, AdminRepository],
    }).compile();

    repository = module.get<AdminRepository>(AdminRepository);
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

  describe('POST /v1/admin', () => {
    it('어드민이 회원가입할 수 있다.', async () => {
      // given
      const requestDto = new AdminSignUpRequest();
      requestDto.email = 'test@google.com';
      requestDto.password = 'password';

      // when
      await request(app.getHttpServer())
        .post('/v1/admin')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(requestDto.email);
    });
  });
});
