import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../../src/admin/admin.module';
import { AdminRepository } from '../../src/admin/admin.repository';
import { AdminService } from '../../src/admin/admin.service';
import { AdminSignUpRequest } from '../../src/admin/dto/admin-sign-up.request';
import { AdminFactory } from '../fixture/entities/admin-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('AdminService', () => {
  let module: TestingModule;
  let service: AdminService;
  let repository: AdminRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), AdminModule],
    })import { AdminSignUpRequest } from './../../src/admin/dto/admin-sign-up.request';
.compile();

    service = module.get<AdminService>(AdminService);
    repository = module.get<AdminRepository>(AdminRepository);
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

  describe('findOneByEmail', () => {
    it('email로 어드민을 조회할 수 있다.', async () => {
      // given
      const email = 'test@google.com';
      const password = 'password';
      await repository.save(AdminFactory.from(email, password));

      // when
      const result = await service.findOneByEmail(email);

      // then
      expect(result.email).toBe(email);
    });
  });

  describe('addAdmin', () => {
    it('어드민을 추가할 수 있다.', async () => {
      // given
      const dto = new AdminSignUpRequest();
      dto.email = 'test@google.com';
      dto.password = 'password';

      // when
      await service.addAdmin(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(dto.email);
    });
  });
});
