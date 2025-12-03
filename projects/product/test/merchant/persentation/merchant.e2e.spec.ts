import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { setNestApp } from '../../../src/common/set-nest-app';
import { Merchant } from '../../../src/merchant/domain/entities/merchant.entity';
import { MerchantModule } from '../../../src/merchant/merchant.module';
import { MerchantSignupRequestFactory } from '../../fixtures/merchant-signup-request.factory';
import { testConnectionOptions } from '../../test-ormconfig';

describe('Merchant E2E', () => {
  let app: INestApplication;
  let module: TestingModule;
  let merchantRepository: Repository<Merchant>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), MerchantModule],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
    merchantRepository = dataSource.getRepository(Merchant);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await merchantRepository.clear();
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });

  describe('POST /v1/merchants', () => {
    it('상점 관리자를 등록할 수 있다.', async () => {
      // given
      const email = 'test@example.com';
      const requestDto = MerchantSignupRequestFactory.create(email);

      // when
      await request(app.getHttpServer())
        .post('/v1/merchants')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const merchant = await merchantRepository.find();
      expect(merchant.length).toBe(1);
      expect(merchant[0].email).toBe(email);
    });
  });
});
