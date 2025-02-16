import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AdminRepository } from '../../src/admin/admin.repository';
import { AdminService } from '../../src/admin/admin.service';
import { AuthService } from '../../src/auth/auth.service';
import { AuthGuard } from '../../src/auth/guards/auth.guard';
import { CategoryController } from '../../src/category/category.controller';
import { CategoryRepository } from '../../src/category/category.repository';
import { CategoryService } from '../../src/category/category.service';
import { CategoryRegisterRequest } from '../../src/category/dto/category-register.request';
import { setNestApp } from '../../src/common/set-nest-app';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { SignInRequestFactory } from '../fixture/dto/sign-in-request-factory';
import { AdminFactory } from '../fixture/entities/admin-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('Category E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let authService: AuthService;
  let repository: CategoryRepository;
  let adminRepository: AdminRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        ConfigModule.forRoot(),
      ],
      providers: [
        CategoryService,
        CategoryRepository,
        AuthService,
        AdminService,
        AdminRepository,
        UserService,
        JwtService,
        UserRepository,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
      controllers: [CategoryController],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get<CategoryRepository>(CategoryRepository);
    adminRepository = module.get<AdminRepository>(AdminRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await repository.clear();
    await adminRepository.clear();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  describe('POST /v1/category', () => {
    it('어드민은 카테고리를 등록할 수 있다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await adminRepository.save(AdminFactory.from(email, password));

      const signInResponse = await authService.adminSignIn(
        SignInRequestFactory.of(email, password),
      );

      const requestDto = new CategoryRegisterRequest();
      requestDto.name = '의류';

      // when
      await request(app.getHttpServer())
        .post('/v1/category')
        .set('Authorization', `Bearer ${signInResponse.accessToken}`)
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('의류');
    });

    it('어드민이 아니라면 카테고리를 등록할 수 없다.', async () => {
      // given
      const requestDto = new CategoryRegisterRequest();
      requestDto.name = '의류';

      // when & then
      await request(app.getHttpServer())
        .post('/v1/category')
        .send(requestDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
