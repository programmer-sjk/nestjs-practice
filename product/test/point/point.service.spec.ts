import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointModule } from '../../src/point/point.module';
import { PointRepository } from '../../src/point/repositories/point.repository';
import { PointService } from '../../src/point/point.service';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('PointService', () => {
  let module: TestingModule;
  let service: PointService;
  let repository: PointRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        PointModule,
        UserModule,
      ],
    }).compile();

    service = module.get<PointService>(PointService);
    repository = module.get<PointRepository>(PointRepository);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  beforeEach(async () => {
    await repository.clear();
    await userRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPointToUser', () => {
    it('사용자에게 포인트를 지급할 수 있다.', async () => {
      // given
      const user = await userRepository.save(UserFactory.of());
      const pointValue = 1_000;

      // when
      await service.addPointToUser(user.id, pointValue);

      // then
      const point = await repository.findOneBy({ userId: user.id });
      expect(point.value).toBe(1_000);
    });
  });

  describe('addSignUpPointToUser', () => {
    it('신규 가입자에게 포인트를 지급할 수 있다.', async () => {
      // given
      const user = await userRepository.save(UserFactory.of());

      // when
      await service.addSignUpPointToUser(user.id);

      // then
      const point = await repository.findOneBy({ userId: user.id });
      expect(point.value).toBe(1_000);
    });
  });
});
