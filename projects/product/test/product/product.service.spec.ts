import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '../../src/product/application/services/product.service';
import { ProductRepository } from '../../src/product/infrastructure/persistence/product.repository';
import { ProductModule } from '../../src/product/product.module';
import { ProductFactory } from '../fixtures/product.factory';
import { testConnectionOptions } from '../test-ormconfig';
describe('ProductService', () => {
  let service: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), ProductModule],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('특정 상품을 조회할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      const result = await service.find(product.id);

      // then
      expect(result.id).toBe(product.id);
      expect(result.name).toBe(productName);
      expect(result.basePrice).toBe(basePrice);
    });
  });
});
