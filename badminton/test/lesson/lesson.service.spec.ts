import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayUtil } from '../../src/common/day-util';
import { LessonType } from '../../src/lesson/enums/lesson-type.enum';
import { LessonTimeRepository } from '../../src/lesson/repositories/lesson-time.repository';
import { LessonService } from '../../src/lesson/lesson.service';
import { TestAddLessonRequest } from '../fixture/dto/test-add-lesson-request';
import { TestCoachCreator } from '../fixture/entity/test-coach-creator';
import { TestLessonCreator } from '../fixture/entity/test-lesson-creator';
import { TestLessonTimeCreator } from '../fixture/entity/test-lesson-time-creator';
import { CoachModule } from './../../src/coach/coach.module';
import { CoachRepository } from './../../src/coach/coach.repository';
import { LessonTimesRequest } from './../../src/lesson/dto/lesson-times-request';
import { LessonRepository } from '../../src/lesson/repositories/lesson.repository';
import { testConnectionOptions } from './../test-ormconfig';

describe('LessonService', () => {
  let module: TestingModule;
  let service: LessonService;
  let lessonRepository: LessonRepository;
  let lessonTimeRepository: LessonTimeRepository;
  let coachRepository: CoachRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), CoachModule],
      providers: [LessonService, LessonRepository, LessonTimeRepository],
    }).compile();

    service = module.get<LessonService>(LessonService);
    lessonRepository = module.get<LessonRepository>(LessonRepository);
    lessonTimeRepository =
      module.get<LessonTimeRepository>(LessonTimeRepository);
    coachRepository = module.get<CoachRepository>(CoachRepository);
  });

  beforeEach(async () => {
    await lessonRepository.clear();
    await lessonTimeRepository.clear();
    await coachRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAvailableLessons', () => {
    it('특정 코치의 레슨 시간을 조회할 수 있다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = new LessonTimesRequest();
      dto.coachId = coach.id;
      dto.lessonType = LessonType.ONE_TIME;

      // when
      const result = await service.findAvailableLessons(dto);

      // then
      expect(result).toHaveLength(31 * 7); // 예약이 없는 경우 하루에 총 31건의 예약시간이 존재
    });

    it('이미 예약된 레슨 시간은 조회되지 않는다.', async () => {
      // given
      const lessonHour = 10;
      const coach = await coachRepository.save(TestCoachCreator.of());
      const lesson = TestLessonCreator.createOneTimeLesson(coach.id);
      lesson.lessonTimes = [
        TestLessonTimeCreator.createOneTimeLessonTimes(
          lesson,
          DayUtil.addFromNow(1, lessonHour).toDate(),
        ),
      ];
      await lessonRepository.save(lesson);

      const dto = new LessonTimesRequest();
      dto.coachId = coach.id;
      dto.lessonType = LessonType.ONE_TIME;

      // when
      const result = await service.findAvailableLessons(dto);

      // then
      expect(result).toHaveLength(217 - 3); // 10~11시 레슨이라 09:30, 10:00, 10:30 예약 시간이 제거됨
    });
  });

  describe('addLesson', () => {
    it('레슨을 예약할 수 있다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = TestAddLessonRequest.oneTime(
        coach.id,
        '예약자 이름',
        '01012345678',
      );

      // when
      await service.addLesson(dto);

      // then
      const result = await lessonRepository.find();
      expect(result).toHaveLength(1);
      expect(result[0].coachId).toBe(coach.id);
      expect(result[0].customerName).toBe('예약자 이름');
      expect(result[0].customerPhone).toBe('01012345678');
    });

    it('이미 예약된 시간에는 레슨을 예약할 수 없다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = TestAddLessonRequest.oneTime(
        coach.id,
        '예약자 이름',
        '01012345678',
      );
      await service.addLesson(dto);

      // when & then
      await expect(() => service.addLesson(dto)).rejects.toThrow(
        new BadRequestException('이미 예약된 레슨 시간입니다.'),
      );
    });
  });
});
