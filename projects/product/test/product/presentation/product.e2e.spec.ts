import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { ResponseEntity } from '../../../src/common/response-entity';
import { setNestApp } from '../../../src/common/set-nest-app';
import { ProductUpdateRequest } from '../../../src/product/application/dto/product-update.request';
import { Product } from '../../../src/product/domain/entities/product.entity';
import { ProductStatus } from '../../../src/product/domain/enums/product-status.enum';
import { ProductModule } from '../../../src/product/product.module';
import { ProductRegisterRequestFactory } from '../../fixtures/product-register-request.factory';
import { ProductFactory } from '../../fixtures/product.factory';
import { testConnectionOptions } from '../../test-ormconfig';
import { DatabaseCleaner } from '../../utils/database-cleaner';

describe('Product E2E', () => {
  let app: INestApplication;
  let module: TestingModule;
  let productRepository: Repository<Product>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), ProductModule],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
    productRepository = dataSource.getRepository(Product);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await DatabaseCleaner.cleanDatabase(dataSource);
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });

  describe('GET /v1/products/:id', () => {
    it('특정 상품을 조회할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      const response = await request(app.getHttpServer())
        .get(`/v1/products/${product.id}`)
        .expect(HttpStatus.OK);

      // then
      const result = response.body as ResponseEntity<Product>;
      expect(result.data.id).toBe(product.id);
      expect(result.data.name).toBe('2025년 신상 패딩');
      expect(result.data.basePrice).toBe(10000);
    });
  });

  describe('GET /v1/products', () => {
    it('상품 목록을 조회할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      const productName2 = '2025년 신상 셔츠';
      const basePrice2 = 20000;
      const product2 = await productRepository.save(
        ProductFactory.create(storeId, productName2, basePrice2),
      );

      // when
      const response = await request(app.getHttpServer())
        .get(`/v1/products`)
        .expect(HttpStatus.OK);

      // then
      const result = response.body as ResponseEntity<Product[]>;
      expect(result.data.length).toBe(2);

      expect(result.data[0].id).toBe(product.id);
      expect(result.data[0].name).toBe('2025년 신상 패딩');
      expect(result.data[0].basePrice).toBe(10000);

      expect(result.data[1].id).toBe(product2.id);
      expect(result.data[1].name).toBe('2025년 신상 셔츠');
      expect(result.data[1].basePrice).toBe(20000);
    });
  });

  describe('POST /v1/products', () => {
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
      await request(app.getHttpServer())
        .post(`/v1/products`)
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const product = await productRepository.find();
      expect(product.length).toBe(1);
      expect(product[0].storeId).toBe(storeId);
      expect(product[0].name).toBe(productName);
      expect(product[0].basePrice).toBe(basePrice);
      expect(product[0].status).toBe(ProductStatus.DRAFT);
    });
  });

  describe('PATCH /v1/products/:id', () => {
    it('상품을 수정할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      const requestDto = new ProductUpdateRequest();
      requestDto.name = '2025년 신상 패딩 2';
      requestDto.basePrice = 15000;

      // when
      await request(app.getHttpServer())
        .patch(`/v1/products/${product.id}`)
        .send(requestDto)
        .expect(HttpStatus.OK);

      // then
      const result = await productRepository.findOneById(product.id);
      expect(result?.name).toBe('2025년 신상 패딩 2');
      expect(result?.basePrice).toBe(15000);
    });
  });

  describe('DELETE /v1/products/:id', () => {
    it('상품을 삭제할 수 있다.', async () => {
      // given
      const storeId = 1;
      const basePrice = 10000;
      const productName = '2025년 신상 패딩';

      const product = await productRepository.save(
        ProductFactory.create(storeId, productName, basePrice),
      );

      // when
      await request(app.getHttpServer())
        .delete(`/v1/products/${product.id}`)
        .expect(HttpStatus.OK);

      // then
      const result = await productRepository.find();
      expect(result).toHaveLength(0);
    });
  });
});
