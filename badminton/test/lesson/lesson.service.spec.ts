import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachRepository } from '../../src/coach/coach.repository';
import { LessonScheduleRequest } from '../../src/lesson/dto/lesson-schedule.request';
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
});
