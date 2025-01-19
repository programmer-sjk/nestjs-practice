import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AddUserRequest } from '../../src/user/dto/add-user.request';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { testTypeormOptions } from '../test-ormconfig';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  let repository: UserRepository;

  beforeAll(async () => {
    initializeTransactionalContext();
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(testTypeormOptions)],
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await repository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addUser', () => {
    it('사용자를 등록할 수 있다.', async () => {
      // given
      const dto = new AddUserRequest();
      dto.name = '서정국';

      // when
      await service.addUser(dto);

      // then
      const result = await repository.find();
      expect(result[0].name).toBe('서정국');
    });
  });
});
