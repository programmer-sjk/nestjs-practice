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
import { CategoryModule } from '../../src/category/category.module';
import { CategoryRepository } from '../../src/category/category.repository';
import { Category } from '../../src/category/entities/category.entity';
import { setNestApp } from '../../src/common/set-nest-app';
import { CouponModule } from '../../src/coupon/coupon.module';
import { PointModule } from '../../src/point/point.module';
import { ProductRegisterRequest } from '../../src/product/dto/product-register.request';
import { ProductController } from '../../src/product/product.controller';
import { ProductRepository } from '../../src/product/product.repository';
import { ProductService } from '../../src/product/product.service';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { SignInRequestFactory } from '../fixture/dto/sign-in-request-factory';
import { AdminFactory } from '../fixture/entities/admin-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('Product E2E', () => {
  let module: TestingModule;
  let app: INestApplication;
  let authService: AuthService;
  let repository: ProductRepository;
  let adminRepository: AdminRepository;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        ConfigModule.forRoot(),
        CouponModule,
        PointModule,
        CategoryModule,
      ],
      providers: [
        ProductService,
        ProductRepository,
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
      controllers: [ProductController],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get<ProductRepository>(ProductRepository);
    adminRepository = module.get<AdminRepository>(AdminRepository);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await repository.clear();
    await adminRepository.clear();
    await categoryRepository.clear();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  describe('POST /v1/product', () => {
    it('어드민은 상품을 등록할 수 있다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await adminRepository.save(AdminFactory.from(email, password));

      const category = await categoryRepository.save(Category.of('의류 상의'));

      const signInResponse = await authService.adminSignIn(
        SignInRequestFactory.of(email, password),
      );

      const requestDto = new ProductRegisterRequest();
      requestDto.name = '검은색 패딩';
      requestDto.price = 100_000;
      requestDto.stock = 50;
      requestDto.categoryId = category.id;

      // when
      await request(app.getHttpServer())
        .post('/v1/product')
        .set('Authorization', `Bearer ${signInResponse.accessToken}`)
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('검은색 패딩');
      expect(result[0].price).toBe(100_000);
      expect(result[0].stock).toBe(50);
    });

    it('어드민이 아니라면 상품을 등록할 수 없다.', async () => {
      // given
      const requestDto = new ProductRegisterRequest();
      requestDto.name = '의류';
      requestDto.price = 100_000;
      requestDto.stock = 50;

      // when & then
      await request(app.getHttpServer())
        .post('/v1/product')
        .send(requestDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
