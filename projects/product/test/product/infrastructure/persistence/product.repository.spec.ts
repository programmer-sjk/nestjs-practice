import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductUpdateRequest } from '../../../../src/product/application/dto/product-update.request';
import { ProductService } from '../../../../src/product/application/services/product.service';
import { ProductStatus } from '../../../../src/product/domain/enums/product-status.enum';
import { ProductRepository } from '../../../../src/product/infrastructure/persistence/product.repository';
import { ProductModule } from '../../../../src/product/product.module';
import { ProductRegisterRequestFactory } from '../../../fixtures/product-register-request.factory';
import { ProductFactory } from '../../../fixtures/product.factory';
import { testConnectionOptions } from '../../../test-ormconfig';

describe('ProductService', () => {
  let module: TestingModule;
  let service: ProductService;
  let productRepository: ProductRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), ProductModule],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  beforeEach(async () => {
    await productRepository.clear();
  });

  afterAll(async () => {
    await module.close();
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

    it('상품이 없다면 예외가 발생한다.', async () => {
      // when
      await expect(service.find(-1)).rejects.toThrow(
        new NotFoundException('Product not found'),
      );
    });
  });

  describe('findAll', () => {
    it('상품 목록을 조회할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      const result = await service.findAll();
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(product.id);
      expect(result[0].name).toBe(productName);
      expect(result[0].basePrice).toBe(basePrice);
    });
  });

  describe('register', () => {
    it('상품을 등록할 수 있다.', async () => {
      // given
      const storeId = 1;
      const productName = '2025년 신상 패딩';
      const basePrice = 10000;

      const requestDto = ProductRegisterRequestFactory.create(
        storeId,
        productName,
        basePrice,
      );

      // when
      await service.register(requestDto);

      // then
      const product = await productRepository.find();
      expect(product.length).toBe(1);
      expect(product[0].storeId).toBe(storeId);
      expect(product[0].name).toBe(productName);
      expect(product[0].basePrice).toBe(basePrice);
      expect(product[0].status).toBe(ProductStatus.DRAFT);
    });
  });

  describe('update', () => {
    it('상품을 수정할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      const dto = new ProductUpdateRequest();
      dto.name = '2025년 신상 패딩 2';
      dto.basePrice = 15000;

      // when
      await service.update(product.id, dto);

      // then
      const result = await productRepository.findOneById(product.id);
      expect(result?.name).toBe('2025년 신상 패딩 2');
      expect(result?.basePrice).toBe(15000);
    });
  });

  describe('remove', () => {
    it('상품을 삭제할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      await service.remove(product.id);

      // then
      const result = await productRepository.find();
      expect(result).toHaveLength(0);
    });
  });
});
