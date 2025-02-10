import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from '../../src/lesson/lesson.module';
import { LessonRepository } from '../../src/lesson/lesson.repository';
import { LessonService } from '../../src/lesson/lesson.service';
import { testConnectionOptions } from '../test-ormconfig';

describe('LessonService', () => {
  let module: TestingModule;
  let service: LessonService;
  let lessonRepository: LessonRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), LessonModule],
    }).compile();

    service = module.get<LessonService>(LessonService);
    lessonRepository = module.get<LessonRepository>(LessonRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await lessonRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
