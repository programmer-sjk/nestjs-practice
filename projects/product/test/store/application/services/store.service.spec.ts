import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Merchant } from '../../../../src/merchant/domain/entities/merchant.entity';
import { MerchantModule } from '../../../../src/merchant/merchant.module';
import { StoreService } from '../../../../src/store/application/services/store.service';
import { Store } from '../../../../src/store/domain/entities/store.entity';
import { StoreModule } from '../../../../src/store/store.module';
import { MerchantFactory } from '../../../fixtures/merchant.factory';
import { StoreRegisterRequestFactory } from '../../../fixtures/store-register-request.factory';
import { testConnectionOptions } from '../../../test-ormconfig';
import { DatabaseCleaner } from '../../../utils/database-cleaner';

describe('StoreService', () => {
  let module: TestingModule;
  let service: StoreService;
  let storeRepository: Repository<Store>;
  let merchantRepository: Repository<Merchant>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        MerchantModule,
        StoreModule,
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);

    dataSource = module.get<DataSource>(DataSource);
    storeRepository = dataSource.getRepository(Store);
    merchantRepository = dataSource.getRepository(Merchant);
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

  describe('register', () => {
    it('상점을 등록 할 수 있다.', async () => {
      // given
      const merchant = await merchantRepository.save(
        MerchantFactory.create('test@example.com'),
      );

      const requestDto = StoreRegisterRequestFactory.create('test store name');

      // when
      await service.register(merchant.id, requestDto);

      // then
      const result = await storeRepository.find();
      expect(result.length).toBe(1);
      expect(result[0].merchantId).toBe(merchant.id);
      expect(result[0].name).toBe('test store name');
    });
  });
});
