import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachModule } from '../../src/coach/coach.module';
import { CoachRepository } from '../../src/coach/coach.repository';
import { setNestApp } from '../../src/common/set-nest-app';
import { LessonController } from '../../src/lesson/lesson.controller';
import { LessonService } from '../../src/lesson/lesson.service';
import { LessonTimeRepository } from '../../src/lesson/repositories/lesson-time.repository';
import { LessonRepository } from '../../src/lesson/repositories/lesson.repository';
import { testConnectionOptions } from './../test-ormconfig';

describe('LessonController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let controller: LessonController;
  let service: LessonService;
  let lessonRepository: LessonRepository;
  let lessonTimeRepository: LessonTimeRepository;
  let coachRepository: CoachRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), CoachModule],
      controllers: [LessonController],
      providers: [LessonService, LessonRepository, LessonTimeRepository],
    }).compile();

    controller = module.get<LessonController>(LessonController);
    service = module.get<LessonService>(LessonService);
    lessonRepository = module.get<LessonRepository>(LessonRepository);
    lessonTimeRepository =
      module.get<LessonTimeRepository>(LessonTimeRepository);
    coachRepository = module.get<CoachRepository>(CoachRepository);

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
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
    expect(controller).toBeDefined();
  });
});
