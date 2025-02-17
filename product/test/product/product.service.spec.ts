import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRegisterRequest } from '../../src/product/dto/product-register.request';
import { ProductModule } from '../../src/product/product.module';
import { ProductRepository } from '../../src/product/product.repository';
import { ProductService } from '../../src/product/product.service';
import { testConnectionOptions } from '../test-ormconfig';

describe('ProductService', () => {
  let module: TestingModule;
  let service: ProductService;
  let repository: ProductRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), ProductModule],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  beforeEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addProcut', () => {
    it('상품을 등록할 수 있다.', async () => {
      // given
      const dto = new ProductRegisterRequest();
      dto.name = '검은색 패딩';
      dto.price = 100_000;
      dto.stock = 50;

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
