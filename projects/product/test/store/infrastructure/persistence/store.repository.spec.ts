import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MerchantRepository } from '../../../../src/merchant/infrastructure/persistence/merchant.repository';
import { MerchantModule } from '../../../../src/merchant/merchant.module';
import { StoreRepository } from '../../../../src/store/infrastructure/persistence/store.repository';
import { StoreModule } from '../../../../src/store/store.module';
import { MerchantFactory } from '../../../fixtures/merchant.factory';
import { StoreFactory } from '../../../fixtures/store.factory';
import { testConnectionOptions } from '../../../test-ormconfig';
import { DatabaseCleaner } from '../../../utils/database-cleaner';

describe('StoreRepository', () => {
  let module: TestingModule;
  let repository: StoreRepository;
  let merchantRepository: MerchantRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        MerchantModule,
        StoreModule,
      ],
    }).compile();
    repository = module.get<StoreRepository>('IStoreRepository');
    merchantRepository = module.get<MerchantRepository>('IMerchantRepository');
  });

  beforeEach(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await DatabaseCleaner.cleanDatabase(dataSource);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('save', () => {
    it('상점을 저장할 수 있다.', async () => {
      // given
      const merchant = await merchantRepository.save(
        MerchantFactory.create('test@example.com'),
      );

      // when
      await repository.save(StoreFactory.create(merchant.id));

      // then
      const store = await repository.findAll();
      expect(store.length).toBe(1);
      expect(store[0].merchantId).toBe(merchant.id);
    });
  });
});
