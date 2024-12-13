import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakeOrderRequest } from '../../src/order/dto/take-order-request';
import { OrderService } from '../../src/order/order.service';
import { OrderItemRepository } from '../../src/order/repositories/order-item.repository';
import { TestCustomerCreator } from '../fixture/entity/test-customer-creator';
import { TestOrderItemCreator } from '../fixture/entity/test-item-order.creator';
import { TestOrderCreator } from '../fixture/entity/test-order.creator';
import { testConnectionOptions } from '../test-ormconfig';
import { CustomerModule } from './../../src/customer/customer.module';
import { CustomerRepository } from './../../src/customer/customer.repository';
import { OrderRepository } from './../../src/order/repositories/order.repository';

describe('OrderService', () => {
  let module: TestingModule;
  let service: OrderService;
  let orderRepository: OrderRepository;
  let orderItemRepository: OrderItemRepository;
  let customerRepository: CustomerRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), CustomerModule],
      providers: [OrderService, OrderRepository, OrderItemRepository],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    orderItemRepository = module.get<OrderItemRepository>(OrderItemRepository);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
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
    expect(service).toBeDefined();
  });

  describe('findOrders', () => {
    it('주문을 조회할 수 있다.', async () => {
      // given
      const customer = await customerRepository.save(TestCustomerCreator.of());
      const order = TestOrderCreator.of(customer);
      order.orderItems = [TestOrderItemCreator.of()];
      const expected = await orderRepository.save(order);

      // when
      const result = await service.findOrders(customer.id);

      // then
      expect(result[0].id).toEqual(expected.id);
    });
  });

  describe('addOrder', () => {
    it('주문을 추가할 수 있다.', async () => {
      // given
      const customer = await customerRepository.save(TestCustomerCreator.of());
      const order = TestOrderCreator.of(customer);
      order.orderItems = [TestOrderItemCreator.of()];

      // when
      const result = await orderRepository.save(order);

      // then
      const orders = await orderRepository.find();
      expect(result.id).toEqual(orders[0].id);
    });
  });

  describe('returnClothes', () => {
    it('의류 주문을 반환 신청할 수 있다.', async () => {
      // given
      const customer = await customerRepository.save(TestCustomerCreator.of());
      const order = TestOrderCreator.of(customer);
      order.orderItems = [TestOrderItemCreator.of()];
      const savedOrder = await orderRepository.save(order);

      const dto = new TakeOrderRequest();
      dto.customerId = customer.id;
      dto.orderItemIds = savedOrder.orderItems.map((item) => item.id);

      // when
      const result = await service.takeOrderItems(dto);

      // then
      const items = await orderItemRepository.find();
      expect(items[0].requestedAt).toBeTruthy();
    });
  });
});
