import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { CalendarController } from '../../src/calendar/calendar.controller';
import { CalendarService } from '../../src/calendar/calendar.service';
import { RegisterCalendarRequest } from '../../src/calendar/dto/register-calendar.request';
import { UpdateCalendarRequest } from '../../src/calendar/dto/update-calendar.request';
import { CalendarUser } from '../../src/calendar/entities/calendar-user.entity';
import { CalendarUserRepository } from '../../src/calendar/repositories/calendar-user.repository';
import { CalendarRepository } from '../../src/calendar/repositories/calendar.repository';
import { setNestApp } from '../../src/common/set-nest-app';
import { UserRepository } from '../../src/user/user.repository';
import { TestCalendarFactory } from '../fixture/test-calendar-factory';
import { TestUserFactory } from '../fixture/test-user-factory';
import { testTypeormOptions } from '../test-ormconfig';

describe('Calendar e2e', () => {
  let module: TestingModule;
  let app: INestApplication;
  let repository: CalendarRepository;
  let calendarUserRepository: CalendarUserRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    initializeTransactionalContext();
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync(testTypeormOptions)],
      controllers: [CalendarController],
      providers: [
        CalendarService,
        CalendarRepository,
        CalendarUserRepository,
        UserRepository,
      ],
    }).compile();

    repository = module.get<CalendarRepository>(CalendarRepository);
    calendarUserRepository = module.get<CalendarUserRepository>(
      CalendarUserRepository,
    );
    userRepository = module.get<UserRepository>(UserRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  beforeEach(async () => {
    await repository.clear();
    await userRepository.clear();
    await calendarUserRepository.clear();
  });

  describe('GET /calendar', () => {
    it('일정 목록을 조회할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      // when
      const response = await request(app.getHttpServer())
        .get('/v1/calendar')
        .expect(HttpStatus.OK);

      // then
      const result = response.body.data;
      expect(result[0].title).toBe('계엄령 회의');

      const userIds = result[0].users.map((user) => user.id);
      expect(userIds.sort()).toEqual([userA.id, userB.id].sort());
    });
  });

  describe('POST /calendar', () => {
    it('일정을 등록할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const requestDto = new RegisterCalendarRequest();
      requestDto.title = '개발팀 회의';
      requestDto.startDate = new Date('2025-01-31 15:00:00');
      requestDto.endDate = new Date('2025-01-31 16:00:00');
      requestDto.userIds = [userA.id, userB.id];

      // when
      await request(app.getHttpServer())
        .post('/v1/calendar')
        .send(requestDto)
        .expect(HttpStatus.CREATED);

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

  describe('PUT /calendar', () => {
    it('일정을 수정할 수 있다.', async () => {
      // given
      const userA = await userRepository.save(TestUserFactory.of('서정국'));
      const userB = await userRepository.save(TestUserFactory.of('계엄군'));

      const calendar = await repository.save(
        TestCalendarFactory.of('계엄령 회의'),
      );

      await calendarUserRepository.save(CalendarUser.of(calendar.id, userA.id));
      await calendarUserRepository.save(CalendarUser.of(calendar.id, userB.id));

      const requestDto = new UpdateCalendarRequest();
      requestDto.id = calendar.id;
      requestDto.title = '개발팀 회의';
      requestDto.startDate = new Date('2025-01-31 15:00:00');
      requestDto.endDate = new Date('2025-01-31 16:00:00');
      requestDto.userIds = [userA.id, userB.id];

      // when
      await request(app.getHttpServer())
        .put('/v1/calendar')
        .send(requestDto)
        .expect(HttpStatus.OK);

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

      const requestDto = new UpdateCalendarRequest();
      requestDto.id = calendar.id;
      requestDto.title = '개발팀 회의';
      requestDto.startDate = new Date('2025-01-31 15:00:00');
      requestDto.endDate = new Date('2025-01-31 16:00:00');
      requestDto.userIds = [userB.id, userC.id];

      // when
      await request(app.getHttpServer())
        .put('/v1/calendar')
        .send(requestDto)
        .expect(HttpStatus.OK);

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

  describe('DELETE /calendar/:id', () => {
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
      await request(app.getHttpServer())
        .delete(`/v1/calendar/${calendar.id}`)
        .expect(HttpStatus.OK);

      // then
      const deletedCalendar = await repository.findOneBy({ id: calendar.id });
      expect(deletedCalendar).toBeNull();

      const calendarUsers = await calendarUserRepository.find();
      expect(calendarUsers).toHaveLength(0);
    });
  });
});
