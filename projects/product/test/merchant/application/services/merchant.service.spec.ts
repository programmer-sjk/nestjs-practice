import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MerchantService } from '../../../../src/merchant/application/services/merchant.service';
import { Merchant } from '../../../../src/merchant/domain/entities/merchant.entity';
import { MerchantModule } from '../../../../src/merchant/merchant.module';
import { MerchantSignupRequestFactory } from '../../../fixtures/merchant-signup-request.factory';
import { MerchantFactory } from '../../../fixtures/merchant.factory';
import { testConnectionOptions } from '../../../test-ormconfig';

describe('MerchantService', () => {
  let module: TestingModule;
  let service: MerchantService;
  let merchantRepository: Repository<Merchant>;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), MerchantModule],
    }).compile();

    service = module.get<MerchantService>(MerchantService);
    dataSource = module.get<DataSource>(DataSource);
    merchantRepository = dataSource.getRepository(Merchant);
  });

  beforeEach(async () => {
    await merchantRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('email로 상점 관리자를 조회할 수 있다.', async () => {
      // given
      const merchant = await merchantRepository.save(
        MerchantFactory.create('test@example.com'),
      );

      // when
      const result = await service.findByEmail('test@example.com');

      // then
      expect(result?.id).toBe(merchant.id);
    });
  });

  describe('signUp', () => {
    it('상점 관리자를 등록할 수 있다.', async () => {
      // given
      const email = 'test@example.com';
      const requestDto = MerchantSignupRequestFactory.create(email);

      // when
      await service.signUp(requestDto);

      // then
      const merchant = await merchantRepository.find();
      expect(merchant.length).toBe(1);
      expect(merchant[0].email).toBe(email);
    });
  });
});
