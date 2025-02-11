import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachRepository } from '../../src/coach/coach.repository';
import { DateUtil } from '../../src/common/date-util';
import { LessonScheduleRequest } from '../../src/lesson/dto/lesson-schedule.request';
import { RegisterRequest } from '../../src/lesson/dto/register.request';
import { Lesson } from '../../src/lesson/entities/lesson.entity';
import { DayOfWeek } from '../../src/lesson/enums/day-of-week.enum';
import { LessonType } from '../../src/lesson/enums/lesson-type.enum';
import { LessonModule } from '../../src/lesson/lesson.module';
import { LessonRepository } from '../../src/lesson/lesson.repository';
import { LessonService } from '../../src/lesson/lesson.service';
import { TestCoachCreator } from '../fixture/entity/test-coach-creator';
import { testConnectionOptions } from '../test-ormconfig';

describe('LessonService', () => {
  let module: TestingModule;
  let service: LessonService;
  let lessonRepository: LessonRepository;
  let coachRepository: CoachRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), LessonModule],
    }).compile();

    service = module.get<LessonService>(LessonService);
    lessonRepository = module.get<LessonRepository>(LessonRepository);
    coachRepository = module.get<CoachRepository>(CoachRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await lessonRepository.clear();
    await coachRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findLessonSchedules', () => {
    it('코치의 예약 가능한 레슨 스케줄을 조회할 수 있다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = new LessonScheduleRequest();
      dto.coachId = coach.id;

      // when
      const result = await service.findLessonSchedules(dto);

      // then
      expect(Object.entries(result.schedules)).toHaveLength(7);
      expect(Object.entries(result.schedules)[0][1]).toHaveLength(16);
    });
  });

  describe('addLesson', () => {
    it('레슨을 등록할 수 있다', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = new RegisterRequest();
      dto.coachId = coach.id;
      dto.userId = 1;
      dto.type = LessonType.ONE_TIME;
      dto.dayOfWeek = DayOfWeek.MONDAY;
      dto.startDate = DateUtil.now()
        .plus({ day: 1 })
        .set({ hour: 7 })
        .toJSDate();

      // when
      await service.addLesson(dto);

      // then
      const result = await lessonRepository.find();
      expect(result).toHaveLength(1);
      expect(result[0].coachId).toBe(coach.id);
      expect(result[0].userId).toBe(1);
      expect(result[0].type).toBe(LessonType.ONE_TIME);
    });

    it('레슨 시간이 유효하지 않으면 등록할 수 없다', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = new RegisterRequest();
      dto.coachId = coach.id;
      dto.userId = 1;
      dto.type = LessonType.ONE_TIME;
      dto.dayOfWeek = DayOfWeek.MONDAY;
      dto.startDate = DateUtil.now()
        .plus({ day: 1 })
        .set({ hour: 6 })
        .toJSDate();

      // when & then
      await expect(service.addLesson(dto)).rejects.toThrow(
        new BadRequestException('예약할 수 없는 시간입니다.'),
      );
    });

    it('레슨 날짜가 유효하지 않으면 등록할 수 없다', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = new RegisterRequest();
      dto.coachId = coach.id;
      dto.userId = 1;
      dto.type = LessonType.ONE_TIME;
      dto.dayOfWeek = DayOfWeek.MONDAY;
      dto.startDate = DateUtil.now().set({ hour: 7 }).toJSDate();

      // when & then
      await expect(service.addLesson(dto)).rejects.toThrow(
        new BadRequestException('예약은 내일부터 일주일간 가능합니다.'),
      );
    });

    it('이미 예약된 시간에 레슨을 등록할 수 없다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const startDate = DateUtil.now()
        .plus({ day: 1 })
        .set({ hour: 7 })
        .toJSDate();
      await lessonRepository.save(
        Lesson.of(
          coach.id,
          1,
          LessonType.ONE_TIME,
          DayOfWeek.MONDAY,
          undefined,
          startDate,
        ),
      );

      const dto = new RegisterRequest();
      dto.coachId = coach.id;
      dto.userId = 1;
      dto.type = LessonType.ONE_TIME;
      dto.dayOfWeek = DayOfWeek.MONDAY;
      dto.startDate = startDate;

      // when & then
      await expect(service.addLesson(dto)).rejects.toThrow(
        new BadRequestException('이미 예약된 레슨 시간입니다.'),
      );
    });
  });

  describe('removeLesson', () => {
    it('레슨을 삭제할 수 있다', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const startDate = DateUtil.now()
        .plus({ day: 1 })
        .set({ hour: 7 })
        .toJSDate();
      const lesson = await lessonRepository.save(
        Lesson.of(
          coach.id,
          1,
          LessonType.ONE_TIME,
          DayOfWeek.MONDAY,
          undefined,
          startDate,
        ),
      );

      // when
      await service.removeLesson(lesson.id);

      // then
      const result = await lessonRepository.find();
      expect(result).toHaveLength(0);
    });
  });
});
