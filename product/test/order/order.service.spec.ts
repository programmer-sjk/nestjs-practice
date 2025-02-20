import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddOrderRequest } from '../../src/order/dto/add-order.request';
import { OrderModule } from '../../src/order/order.module';
import { OrderService } from '../../src/order/order.service';
import { OrderItemRepository } from '../../src/order/repositories/order-item.repository';
import { OrderRepository } from '../../src/order/repositories/order.repository';
import { ProductModule } from '../../src/product/product.module';
import { ProductRepository } from '../../src/product/product.repository';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { ProductFactory } from '../fixture/entities/product-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('OrderService', () => {
  let module: TestingModule;
  let service: OrderService;
  let repository: OrderRepository;
  let orderItemRepository: OrderItemRepository;
  let userRepository: UserRepository;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        OrderModule,
        ProductModule,
        UserModule,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<OrderRepository>(OrderRepository);
    orderItemRepository = module.get<OrderItemRepository>(OrderItemRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  beforeEach(async () => {
    await repository.clear();
    await orderItemRepository.clear();
    await userRepository.clear();
    await productRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('newOrder', () => {
    it('사용자가 주문을 추가할 수 있다.', async () => {
      // given
      const user = await userRepository.save(UserFactory.of());
      const product = await productRepository.save(
        ProductFactory.of('하얀색 스니커즈'),
      );

      const dto = new AddOrderRequest();
      dto.userId = user.id;
      dto.productIds = [product.id];

      // when
      await service.newOrder(dto);

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
