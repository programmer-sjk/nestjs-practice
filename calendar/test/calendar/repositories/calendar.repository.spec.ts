import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarUserRepository } from '../../../src/calendar/repositories/calendar-user.repository';
import { CalendarRepository } from '../../../src/calendar/repositories/calendar.repository';
import { UserRepository } from '../../../src/user/user.repository';
import { TestCalendarFactory } from '../../fixture/test-calendar-factory';
import { TestUserFactory } from '../../fixture/test-user-factory';
import { testConnectionOptions } from '../../test-ormconfig';
import { CalendarUser } from './../../../src/calendar/entities/calendar-user.entity';

describe('CalendarRepository', () => {
  let module: TestingModule;
  let repository: CalendarRepository;
  let calendarUserRepository: CalendarUserRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions)],
      providers: [CalendarRepository, CalendarUserRepository, UserRepository],
    }).compile();

    repository = module.get<CalendarRepository>(CalendarRepository);
    calendarUserRepository = module.get<CalendarUserRepository>(
      CalendarUserRepository,
    );
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await repository.clear();
    await userRepository.clear();
    await calendarUserRepository.clear();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('캘린더와 참석하는 사용자 정보를 조회할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      const limit = 20;
      const offset = 0;

      // when
      const [result] = await repository.findAll(limit, offset);

      // then
      expect(result[0].title).toBe('계엄령 회의');

      const users = result[0].calendarUsers.map(
        (calendarUser) => calendarUser.user,
      );
      expect(users.sort()).toEqual([userA, userB].sort());
    });
  });
});
