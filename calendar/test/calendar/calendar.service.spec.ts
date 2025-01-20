import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  StorageDriver
} from 'typeorm-transactional';
import { CalendarService } from '../../src/calendar/calendar.service';
import { RegisterCalendarRequest } from '../../src/calendar/dto/register-calendar.request';
import { UpdateCalendarRequest } from '../../src/calendar/dto/update-calendar.request';
import { CalendarUser } from '../../src/calendar/entities/calendar-user.entity';
import { CalendarUserRepository } from '../../src/calendar/repositories/calendar-user.repository';
import { CalendarRepository } from '../../src/calendar/repositories/calendar.repository';
import { PaginationRequest } from '../../src/common/pagination/pagination.request';
import { UserRepository } from '../../src/user/user.repository';
import { TestCalendarFactory } from '../fixture/test-calendar-factory';
import { TestUserFactory } from '../fixture/test-user-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('CalendarService', () => {
  let module: TestingModule;
  let service: CalendarService;
  let repository: CalendarRepository;
  let calendarUserRepository: CalendarUserRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(testTypeormOptions)],
      providers: [
        CalendarService,
        CalendarRepository,
        CalendarUserRepository,
        UserRepository,
      ],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
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
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('일정 목록을 조회할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      const paginationRequest = new PaginationRequest();
      paginationRequest.limit = 10;

      // when
      const result = await service.findAll(paginationRequest);

      // then
      expect(result.data[0].title).toBe('계엄령 회의');

      const userIds = result.data[0].users.map((user) => user.id);
      expect(userIds.sort()).toEqual([userA.id, userB.id].sort());
    });

    it('일정 목록은 페이지네이션 된다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      for (let i = 0; i < 10; i++) {
        const calendar = await repository.save(
          TestCalendarFactory.of('계엄령 회의'),
        );
  
        await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
        await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));
      }
      
      const paginationRequest = new PaginationRequest();
      paginationRequest.limit = 2;

      // when
      const result = await service.findAll(paginationRequest);

      // then
      expect(result.data).toHaveLength(2);
      expect(result.limit).toBe(2);
      expect(result.totalCount).toBe(10);
      expect(result.currentPage).toBe(0);
      expect(result.totalPage).toBe(5);
    });
  });

  describe('addCalendar', () => {
    it('일정을 등록할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const dto = new RegisterCalendarRequest();
      dto.title = '개발팀 회의';
      dto.startDate = new Date('2025-01-31 15:00:00');
      dto.endDate = new Date('2025-01-31 16:00:00');
      dto.userIds = [userA.id, userB.id];

      // when
      await service.addCalendar(dto);

      // then
      const calendar = await repository.find();
      expect(calendar[0].title).toBe('개발팀 회의');
      expect(calendar[0].startDate).toEqual(new Date('2025-01-31 15:00:00'));
      expect(calendar[0].endDate).toEqual(new Date('2025-01-31 16:00:00'));

      const calendarUsers = await calendarUserRepository.find();
      const userIds = calendarUsers.map((calendarUser) => calendarUser.userId);
      expect(userIds.sort()).toEqual([userA.id, userB.id].sort());
    });
  });

  describe('updateCalendar', () => {
    it('일정을 수정할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      const dto = new UpdateCalendarRequest();
      dto.title = '개발팀 회의';
      dto.startDate = new Date('2025-01-31 15:00:00');
      dto.endDate = new Date('2025-01-31 16:00:00');
      dto.userIds = [userA.id, userB.id];

      // when
      await service.updateCalendar(dto);

      // then
      const updatedCalendar = await repository.findOneBy({ id: calendar.id });
      expect(updatedCalendar.title).toBe('개발팀 회의');
      expect(updatedCalendar.startDate).toEqual(
        new Date('2025-01-31 15:00:00'),
      );
      expect(updatedCalendar.endDate).toEqual(new Date('2025-01-31 16:00:00'));
    });

    it('일정의 참석 사용자를 수정할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));
      const userC = await userRepository.save(TestUserFactory.of('개발팀'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      const dto = new UpdateCalendarRequest();
      dto.title = '개발팀 회의';
      dto.startDate = new Date('2025-01-31 15:00:00');
      dto.endDate = new Date('2025-01-31 16:00:00');
      dto.userIds = [userB.id, userC.id];

      // when
      await service.updateCalendar(dto);

      // then
      const updatedCalendar = await repository.findOneBy({ id: calendar.id });
      expect(updatedCalendar.title).toBe('개발팀 회의');
      expect(updatedCalendar.startDate).toEqual(
        new Date('2025-01-31 15:00:00'),
      );
      expect(updatedCalendar.endDate).toEqual(new Date('2025-01-31 16:00:00'));

      const updatedCalendarUsers = await calendarUserRepository.find();
      const userIds = updatedCalendarUsers.map(
        (calendarUser) => calendarUser.userId,
      );
      expect(userIds.sort()).toEqual([userB.id, userC.id].sort());
    });
  });

  describe('removeCalendar', () => {
    it('일정을 삭제할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      // when
      await service.removeCalendar(calendar.id);

      // then
      const deletedCalendar = await repository.findOneBy({ id: calendar.id });
      expect(deletedCalendar).toBeNull();

      const calendarUsers = await calendarUserRepository.find();
      expect(calendarUsers).toHaveLength(0);
    });
  });
});
