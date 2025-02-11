import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CoachRepository } from '../../src/coach/coach.repository';
import { setNestApp } from '../../src/common/set-nest-app';
import { LessonScheduleRequest } from '../../src/lesson/dto/lesson-schedule.request';
import { LessonController } from '../../src/lesson/lesson.controller';
import { LessonModule } from '../../src/lesson/lesson.module';
import { LessonRepository } from '../../src/lesson/lesson.repository';
import { LessonService } from '../../src/lesson/lesson.service';
import { RedisService } from '../../src/redis/redis.service';
import { TestCoachCreator } from '../fixture/entity/test-coach-creator';
import { testConnectionOptions } from '../test-ormconfig';

describe('LessonController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let lessonRepository: LessonRepository;
  let coachRepository: CoachRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), LessonModule],
      controllers: [LessonController],
      providers: [
        LessonService,
        RedisService,
        CoachRepository,
        LessonRepository,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    lessonRepository = module.get<LessonRepository>(LessonRepository);
    coachRepository = module.get<CoachRepository>(CoachRepository);
    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  afterAll(async () => {
    await module.close();
    await app.close();
  });

  beforeEach(async () => {
    await lessonRepository.clear();
  });

  describe('GET /v1/lesson', () => {
    it('코치의 예약 가능한 레슨 스케줄을 조회할 수 있다.', async () => {
      // given
      const coach = await coachRepository.save(TestCoachCreator.of());
      const requestDto = new LessonScheduleRequest();
      requestDto.coachId = coach.id;

      // when
      const response = await request(app.getHttpServer())
        .get('/v1/lesson')
        .query(requestDto)
        .expect(HttpStatus.OK);

      // then
      const schedules = response.body.data.schedules;
      expect(Object.entries(schedules)).toHaveLength(7);
      expect(Object.entries(schedules)[0][1]).toHaveLength(16);
    });
  });
});
