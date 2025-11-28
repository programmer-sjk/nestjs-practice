import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../../../../src/product/domain/entities/product.entity';
import { ProductRepository } from '../../../../src/product/infrastructure/persistence/product.repository';
import { ProductModule } from '../../../../src/product/product.module';
import { ProductFactory } from '../../../fixtures/product.factory';
import { testConnectionOptions } from '../../../test-ormconfig';

describe('ProductRepository', () => {
  let module: TestingModule;
  let repository: ProductRepository;
  let productRepository: Repository<Product>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), ProductModule],
    }).compile();
    repository = module.get<ProductRepository>('IProductRepository');

    dataSource = module.get<DataSource>(DataSource);
    productRepository = dataSource.getRepository(Product);
  });

  beforeEach(async () => {
    await productRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('findOneById', () => {
    it('id로 상품을 조회할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await repository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      const result = await repository.findOneById(product.id);

      // then
      expect(result?.id).toBe(product.id);
      expect(result?.name).toBe(productName);
      expect(result?.basePrice).toBe(basePrice);
    });
  });

  describe('findAll', () => {
    it('상품 목록을 조회할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await repository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      const result = await repository.findAll();

      // then
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(product.id);
      expect(result[0].name).toBe(productName);
      expect(result[0].basePrice).toBe(basePrice);
    });
  });

  describe('save', () => {
    it('상품을 저장할 수 있다.', async () => {
      // given
      const storeId = 1;
      const productName = '2025년 신상 패딩';
      const basePrice = 10000;

      // when
      await repository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // then
      const product = await productRepository.find();
      expect(product.length).toBe(1);
      expect(product[0].storeId).toBe(storeId);
      expect(product[0].name).toBe(productName);
      expect(product[0].basePrice).toBe(basePrice);
    });
  });

  describe('remove', () => {
    it('id에 해당하는 상품을 삭제할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await repository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      await repository.remove(product);

      // then
      const result = await productRepository.find();
      expect(result).toHaveLength(0);
    });
  });
});
