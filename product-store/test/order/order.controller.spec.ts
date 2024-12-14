import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { setNestApp } from '../../src/common/set-nest-app';
import { CustomerModule } from '../../src/customer/customer.module';
import { CustomerRepository } from '../../src/customer/customer.repository';
import { OrderController } from '../../src/order/order.controller';
import { OrderService } from '../../src/order/order.service';
import { OrderItemRepository } from '../../src/order/repositories/order-item.repository';
import { OrderRepository } from '../../src/order/repositories/order.repository';
import { TestAddOrderRequest } from '../fixture/dto/test-add-order-request';
import { TestOrderItemDto } from '../fixture/dto/test-order-item-dto';
import { TestOrdersRequest } from '../fixture/dto/test-orders-request';
import { TestReturnOrderRequest } from '../fixture/dto/test-return-order-request';
import { TestCustomerCreator } from '../fixture/entity/test-customer-creator';
import { TestOrderItemCreator } from '../fixture/entity/test-item-order.creator';
import { TestOrderCreator } from '../fixture/entity/test-order.creator';
import { testConnectionOptions } from '../test-ormconfig';

describe('OrderController', () => {
  let app: INestApplication;
  let module: TestingModule;
  let controller: OrderController;
  let orderRepository: OrderRepository;
  let orderItemRepository: OrderItemRepository;
  let customerRepository: CustomerRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), CustomerModule],
      controllers: [OrderController],
      providers: [OrderService, OrderRepository, OrderItemRepository],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    orderItemRepository = module.get<OrderItemRepository>(OrderItemRepository);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await orderItemRepository.delete({});
    await orderRepository.delete({});
    await customerRepository.delete({});
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('orders', () => {
    it('주문을 조회할 수 있다.', async () => {
      // given
      const customer = await customerRepository.save(TestCustomerCreator.of());
      const order = TestOrderCreator.of(customer);
      order.orderItems = [TestOrderItemCreator.of()];
      const savedOrder = await orderRepository.save(order);

      // when
      const response = await request(app.getHttpServer())
        .get('/api/v1/orders')
        .send(TestOrdersRequest.of(customer.id))
        .expect(200);

      // then
      const result = response.body.data;
      expect(result[0].id).toEqual(savedOrder.id);
    });
  });

  describe('addOrder', () => {
    it('주문을 추가할 수 있다.', async () => {
      // given
      const customer = await customerRepository.save(TestCustomerCreator.of());
      const requestDto = TestAddOrderRequest.of(customer.id, [
        TestOrderItemDto.of(),
      ]);

      // when
      await request(app.getHttpServer())
        .post('/api/v1/orders')
        .send(requestDto)
        .expect(201);

      // then
      const orders = await orderRepository.find();
      expect(orders[0].customerId).toBe(customer.id);
    });
  });

  describe('returnOrder', () => {
    it('의류 주문을 반환 신청할 수 있다.', async () => {
      // given
      const customer = await customerRepository.save(TestCustomerCreator.of());
      const order = TestOrderCreator.of(customer);
      order.orderItems = [TestOrderItemCreator.of()];
      const savedOrder = await orderRepository.save(order);

      const requestDto = TestReturnOrderRequest.of(
        customer.id,
        savedOrder.orderItems.map((item) => item.id),
      );

      // when
      await request(app.getHttpServer())
        .post('/api/v1/orders/return')
        .send(requestDto)
        .expect(201);

      // then
      const items = await orderItemRepository.find();
      expect(items[0].requestedAt).toBeTruthy();
    });
  });
});
