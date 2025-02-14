import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpRequest } from '../../src/user/dto/sign-up.request';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { testConnectionOptions } from '../test-ormconfig';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  let repository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
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
    it('email로 사용자를 조회할 수 있다.', async () => {
      // given
      const dto = new SignUpRequest();
      dto.email = 'test@google.com';
      dto.password = 'password';

      // when
      await service.addUser(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(dto.email);
    });
  });

  describe('addUser', () => {
    it('사용자를 추가할 수 있다.', async () => {
      // given
      const dto = new SignUpRequest();
      dto.email = 'test@google.com';
      dto.password = 'password';

      // when
      await service.addUser(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe(dto.email);
    });
  });
});
