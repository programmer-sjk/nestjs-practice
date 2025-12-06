import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Merchant } from '../../../../src/merchant/domain/entities/merchant.entity';
import { MerchantRepository } from '../../../../src/merchant/infrastructure/persistence/merchant.repository';
import { MerchantModule } from '../../../../src/merchant/merchant.module';
import { MerchantFactory } from '../../../fixtures/merchant.factory';
import { testConnectionOptions } from '../../../test-ormconfig';

describe('MerchantRepository', () => {
  let module: TestingModule;
  let repository: MerchantRepository;
  let merchantRepository: Repository<Merchant>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), MerchantModule],
    }).compile();
    repository = module.get<MerchantRepository>('IMerchantRepository');

    dataSource = module.get<DataSource>(DataSource);
    merchantRepository = dataSource.getRepository(Merchant);
  });

  beforeEach(async () => {
    await merchantRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('findOneByEmail', () => {
    it('email로 상점 관리자를 조회할 수 있다.', async () => {
      // given
      const email = 'test@example.com';
      const merchant = await merchantRepository.save(
        MerchantFactory.create(email),
      );

      // when
      const result = await repository.findOneByEmail(email);

      // then
      expect(result?.id).toBe(merchant.id);
    });
  });

  describe('save', () => {
    it('상점 관리자를 저장할 수 있다.', async () => {
      // given
      const email = 'test@example.com';

      // when
      await repository.save(MerchantFactory.create(email));

      // then
      const merchant = await merchantRepository.find();
      expect(merchant.length).toBe(1);
      expect(merchant[0].email).toBe(email);
    });
  });
});
