import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductUpdateRequest } from '../../../../src/product/application/dto/product-update.request';
import { ProductService } from '../../../../src/product/application/services/product.service';
import { Product } from '../../../../src/product/domain/entities/product.entity';
import { ProductStatus } from '../../../../src/product/domain/enums/product-status.enum';
import { ProductModule } from '../../../../src/product/product.module';
import { ProductOptionGroupFactory } from '../../../fixtures/product-option-group.factory';
import { ProductOptionValueFactory } from '../../../fixtures/product-option-value.factory';
import {
  OptionGroupRegisterFactory,
  OptionValueRegisterFactory,
  ProductRegisterRequestFactory,
} from '../../../fixtures/product-register-request.factory';
import { ProductFactory } from '../../../fixtures/product.factory';
import { testConnectionOptions } from '../../../test-ormconfig';
import { DatabaseCleaner } from '../../../utils/database-cleaner';

describe('ProductService', () => {
  let module: TestingModule;
  let service: ProductService;
  let productRepository: Repository<Product>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), ProductModule],
    }).compile();

    service = module.get<ProductService>(ProductService);
    dataSource = module.get<DataSource>(DataSource);
    productRepository = dataSource.getRepository(Product);
  });

  beforeEach(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await DatabaseCleaner.cleanDatabase(dataSource);
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

      // then
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

    it('상품 등록시 옵션 그룹과 값을 같이 등록할 수 있다.', async () => {
      // given
      const storeId = 1;
      const productName = '2025년 신상 패딩';
      const basePrice = 10000;

      const optionGroup = OptionGroupRegisterFactory.create('색상');
      optionGroup.optionValues = [
        OptionValueRegisterFactory.create('레드'),
        OptionValueRegisterFactory.create('블랙'),
        OptionValueRegisterFactory.create('화이트'),
      ];

      const requestDto = ProductRegisterRequestFactory.createWithOptionGroups(
        storeId,
        productName,
        basePrice,
        [optionGroup],
      );

      // when
      await service.register(requestDto);

      // then
      const product = await productRepository.find({
        relations: ['optionGroups', 'optionGroups.optionValues'],
      });
      expect(product.length).toBe(1);
      expect(product[0].storeId).toBe(storeId);
      expect(product[0].name).toBe(productName);
      expect(product[0].basePrice).toBe(basePrice);
      expect(product[0].status).toBe(ProductStatus.DRAFT);

      expect(product[0].optionGroups.length).toBe(1);
      expect(product[0].optionGroups[0].name).toBe('색상');

      expect(product[0].optionGroups[0].optionValues.length).toBe(3);
      expect(product[0].optionGroups[0].optionValues[0].value).toBe('레드');
      expect(product[0].optionGroups[0].optionValues[1].value).toBe('블랙');
      expect(product[0].optionGroups[0].optionValues[2].value).toBe('화이트');
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

    it('상품을 삭제할 때 옵션 그룹과 값도 삭제된다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const optionGroup = ProductOptionGroupFactory.create('색상');
      optionGroup.optionValues = [
        ProductOptionValueFactory.create('레드'),
        ProductOptionValueFactory.create('블랙'),
        ProductOptionValueFactory.create('화이트'),
      ];

      const product = await productRepository.save(
        ProductFactory.createWithOptionGroups(storeId, productName, basePrice, [
          optionGroup,
        ]),
      );

      // when
      await service.remove(product.id);

      // then
      const result = await productRepository.find({
        withDeleted: true,
        relations: ['optionGroups', 'optionGroups.optionValues'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].deletedAt).toBeDefined();

      expect(result[0].optionGroups[0].deletedAt).toBeDefined();
      expect(result[0].optionGroups[0].optionValues[0].deletedAt).toBeDefined();
      expect(result[0].optionGroups[0].optionValues[1].deletedAt).toBeDefined();
      expect(result[0].optionGroups[0].optionValues[2].deletedAt).toBeDefined();
    });
  });
});
