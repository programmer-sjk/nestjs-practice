import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { AuthGuard } from '../../../src/auth/infrastructure/guards/auth.guard';
import { setNestApp } from '../../../src/common/set-nest-app';
import { Merchant } from '../../../src/merchant/domain/entities/merchant.entity';
import { MerchantModule } from '../../../src/merchant/merchant.module';
import { Store } from '../../../src/store/domain/entities/store.entity';
import { StoreModule } from '../../../src/store/store.module';
import { JwtTokenFactory } from '../../fixtures/jwt-token.factory';
import { MerchantFactory } from '../../fixtures/merchant.factory';
import { StoreRegisterRequestFactory } from '../../fixtures/store-register-request.factory';
import { testConnectionOptions } from '../../test-ormconfig';
import { DatabaseCleaner } from '../../utils/database-cleaner';

describe('Store E2E', () => {
  let app: INestApplication;
  let module: TestingModule;
  let storeRepository: Repository<Store>;
  let merchantRepository: Repository<Merchant>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'test/.env.test' }),
        JwtModule.register({}),
        TypeOrmModule.forRoot(testConnectionOptions),
        StoreModule,
        MerchantModule,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
    storeRepository = dataSource.getRepository(Store);
    merchantRepository = dataSource.getRepository(Merchant);

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

  describe('POST /v1/stores', () => {
    it('상점을 등록할 수 있다.', async () => {
      // given
      const merchant = await merchantRepository.save(
        MerchantFactory.create('test@example.com'),
      );
      const requestDto = StoreRegisterRequestFactory.create('test store name');

      // when
      await request(app.getHttpServer())
        .post('/v1/stores')
        .set('Authorization', `Bearer ${JwtTokenFactory.create(merchant.id)}`)
        .send(requestDto)
        .expect(HttpStatus.CREATED);

      // then
      const store = await storeRepository.find();
      expect(store.length).toBe(1);
      expect(store[0].name).toBe('test store name');
    });
  });
});
