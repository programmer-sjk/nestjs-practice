import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { DayUtil } from '../../src/common/day-util';
import { RemoveLessonRequest } from '../../src/lesson/dto/remove-lesson-request';
import { LessonType } from '../../src/lesson/enums/lesson-type.enum';
import { LessonService } from '../../src/lesson/lesson.service';
import { LessonTimeRepository } from '../../src/lesson/repositories/lesson-time.repository';
import { LessonRepository } from '../../src/lesson/repositories/lesson.repository';
import { TestAddLessonRequest } from '../fixture/dto/test-add-lesson-request';
import { TestCoachCreator } from '../fixture/entity/test-coach-creator';
import { TestLessonCreator } from '../fixture/entity/test-lesson-creator';
import { TestLessonTimeCreator } from '../fixture/entity/test-lesson-time-creator';
import { CoachModule } from './../../src/coach/coach.module';
import { CoachRepository } from './../../src/coach/coach.repository';
import { LessonTimesRequest } from './../../src/lesson/dto/lesson-times-request';
import { RedisModule } from './../../src/redis/redis.module';
import { testConnectionOptions } from './../test-ormconfig';

describe('LessonService', () => {
  let module: TestingModule;
  let service: LessonService;
  let lessonRepository: LessonRepository;
  let lessonTimeRepository: LessonTimeRepository;
  let coachRepository: CoachRepository;
  let redisClient: Redis;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        CoachModule,
        RedisModule,
      ],

      providers: [LessonService, LessonRepository, LessonTimeRepository],
    }).compile();

    service = module.get<LessonService>(LessonService);
    lessonRepository = module.get<LessonRepository>(LessonRepository);
    lessonTimeRepository =
      module.get<LessonTimeRepository>(LessonTimeRepository);
    coachRepository = module.get<CoachRepository>(CoachRepository);

    redisClient = Redis.createClient();
  });

  beforeEach(async () => {
    await lessonRepository.clear();
    await lessonTimeRepository.clear();
    await coachRepository.clear();
    await redisClient.flushall();
  });

  afterAll(async () => {
    await redisClient.quit();
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
        new ConflictException('이미 예약된 레슨 시간입니다.'),
      );
    });

    it('레슨 등록은 동시에 접근할 수 없다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const dto = TestAddLessonRequest.oneTime(
        coach.id,
        '예약자 이름',
        '01012345678',
      );

      // when
      await expect(
        Promise.all([
          service.addLesson(dto),
          service.addLesson(dto),
          service.addLesson(dto),
          service.addLesson(dto),
          service.addLesson(dto),
        ]),
      ).rejects.toThrow(new ConflictException('이미 예약된 레슨 시간입니다.'));

      // then
      const lessons = await lessonRepository.find();
      expect(lessons).toHaveLength(1);
    });
  });

  describe('remove', () => {
    it('예약을 삭제할 수 있다.', async () => {
      // given
      const password = 'hahaha';
      const coach = await coachRepository.save(TestCoachCreator.of());
      const lesson = TestLessonCreator.createOneTimeLesson(coach.id, password);
      lesson.lessonTimes = [
        TestLessonTimeCreator.createOneTimeLessonTimes(
          lesson,
          DayUtil.addFromNow(1, 10).toDate(),
        ),
      ];
      const savedLesson = await lessonRepository.save(lesson);

      const dto = new RemoveLessonRequest();
      dto.lessonId = savedLesson.id;
      dto.customerPhone = savedLesson.customerPhone;
      dto.password = 'hahaha';

      // when
      await service.remove(dto);

      // then
      const result = await lessonRepository.findBy({ id: savedLesson.id });
      expect(result).toHaveLength(0);

      const lessonTimes = await lessonTimeRepository.findBy({
        lessonId: savedLesson.id,
      });
      expect(lessonTimes).toHaveLength(0);
    });

    it('당일 예약은 삭제할 수 없다.', async () => {
      // given
      const password = 'hahaha';
      const coach = await coachRepository.save(TestCoachCreator.of());
      const lesson = TestLessonCreator.createOneTimeLesson(coach.id, password);
      lesson.lessonTimes = [
        TestLessonTimeCreator.createOneTimeLessonTimes(
          lesson,
          DayUtil.addFromNow(0, 7).toDate(),
        ),
      ];
      const savedLesson = await lessonRepository.save(lesson);

      const dto = new RemoveLessonRequest();
      dto.lessonId = savedLesson.id;
      dto.customerPhone = savedLesson.customerPhone;
      dto.password = 'hahaha';

      // when & then
      await expect(() => service.remove(dto)).rejects.toThrow(
        new BadRequestException('당일 예약은 삭제할 수 없습니다.'),
      );
    });

    it('핸드폰 번호, 패스워드가 일치하지 않으면 삭제할 수 없다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const lesson = TestLessonCreator.createOneTimeLesson(coach.id);
      lesson.lessonTimes = [
        TestLessonTimeCreator.createOneTimeLessonTimes(
          lesson,
          DayUtil.addFromNow(1, 10).toDate(),
        ),
      ];
      const savedLesson = await lessonRepository.save(lesson);

      const dto = new RemoveLessonRequest();
      dto.lessonId = savedLesson.id;
      dto.customerPhone = '';
      dto.password = '';

      // when & then
      await expect(() => service.remove(dto)).rejects.toThrow(
        new Error('id나 패스워드가 일치하지 않습니다.'),
      );
    });
  });
});
