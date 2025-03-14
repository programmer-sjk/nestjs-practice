import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { CategoryModule } from '../../src/category/category.module';
import { CategoryRepository } from '../../src/category/category.repository';
import { Category } from '../../src/category/entities/category.entity';
import { ProductRegisterRequest } from '../../src/product/dto/product-register.request';
import { ProductModule } from '../../src/product/product.module';
import { ProductRepository } from '../../src/product/product.repository';
import { ProductService } from '../../src/product/product.service';
import { ProductFactory } from '../fixture/entities/product-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('ProductService', () => {
  let module: TestingModule;
  let service: ProductService;
  let repository: ProductRepository;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(testTypeormOptions),
        ProductModule,
        CategoryModule,
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  beforeEach(async () => {
    await repository.clear();
    await categoryRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByIdsWithPessimisticLock', () => {
    it('id 배열로 상품을 조회할 수 있다.', async () => {
      // given
      const product1 = await repository.save(ProductFactory.of('검은색 패딩'));
      const product2 = await repository.save(ProductFactory.of('하얀색 패딩'));

      // when
      const result = await service.findByIdsWithPessimisticLock([
        product1.id,
        product2.id,
      ]);

      // then
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('검은색 패딩');
      expect(result[1].name).toBe('하얀색 패딩');
    });
  });

  describe('addProcut', () => {
    it('상품을 등록할 수 있다.', async () => {
      // given
      await categoryRepository.save(Category.of('의류 상의'));

      const dto = new ProductRegisterRequest();
      dto.name = '검은색 패딩';
      dto.price = 100_000;
      dto.stock = 50;
      dto.categoryId = 1;

      // when
      await service.addProduct(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('검은색 패딩');
      expect(result[0].price).toBe(100_000);
      expect(result[0].stock).toBe(50);
    });
  });
});
