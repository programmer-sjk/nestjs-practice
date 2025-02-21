import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { AuthGuard } from '../../src/auth/guards/auth.guard';
import { CategoryModule } from '../../src/category/category.module';
import { setNestApp } from '../../src/common/set-nest-app';
import { CouponModule } from '../../src/coupon/coupon.module';
import { AddOrderRequest } from '../../src/order/dto/add-order.request';
import { OrderController } from '../../src/order/order.controller';
import { OrderService } from '../../src/order/order.service';
import { OrderItemRepository } from '../../src/order/repositories/order-item.repository';
import { OrderRepository } from '../../src/order/repositories/order.repository';
import { PointModule } from '../../src/point/point.module';
import { ProductRepository } from '../../src/product/product.repository';
import { ProductService } from '../../src/product/product.service';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { SignInRequestFactory } from '../fixture/dto/sign-in-request-factory';
import { ProductFactory } from '../fixture/entities/product-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('OrderController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let authService: AuthService;
  let repository: OrderRepository;
  let orderItemRepository: OrderItemRepository;
  let userRepository: UserRepository;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        ConfigModule.forRoot(),
        CouponModule,
        PointModule,
        AuthModule,
        CategoryModule,
      ],
      providers: [
        JwtService,
        OrderService,
        UserService,
        ProductService,
        OrderRepository,
        OrderItemRepository,
        UserRepository,
        ProductRepository,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
      controllers: [OrderController],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    repository = module.get<OrderRepository>(OrderRepository);
    orderItemRepository = module.get<OrderItemRepository>(OrderItemRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    productRepository = module.get<ProductRepository>(ProductRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await repository.clear();
    await orderItemRepository.clear();
    await userRepository.clear();
    await productRepository.clear();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  describe('POST /v1/order', () => {
    it('사용자가 주문을 등록할 수 있다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      const user = await userRepository.save(UserFactory.from(email, password));
      const product = await productRepository.save(
        ProductFactory.of('하얀색 스니커즈'),
      );

      const signInResponse = await authService.signIn(
        SignInRequestFactory.of(email, password),
      );

      const requestDto = new AddOrderRequest();
      requestDto.productIds = [product.id];

      // when
      await request(app.getHttpServer())
        .post('/v1/order')
        .set('Authorization', `Bearer ${signInResponse.accessToken}`)
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const orders = await repository.find();
      expect(orders).toHaveLength(1);
      expect(orders[0].userId).toBe(user.id);

      const orderItems = await orderItemRepository.find();
      expect(orderItems).toHaveLength(1);
      expect(orderItems[0].orderId).toBe(orders[0].id);
      expect(orderItems[0].productId).toBe(product.id);
    });
  });
});
