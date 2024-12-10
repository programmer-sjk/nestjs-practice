import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CoachModule } from '../../src/coach/coach.module';
import { CoachRepository } from '../../src/coach/coach.repository';
import { setNestApp } from '../../src/common/set-nest-app';
import { LessonTimesRequest } from '../../src/lesson/dto/lesson-times-request';
import { LessonType } from '../../src/lesson/enums/lesson-type.enum';
import { LessonController } from '../../src/lesson/lesson.controller';
import { LessonService } from '../../src/lesson/lesson.service';
import { LessonTimeRepository } from '../../src/lesson/repositories/lesson-time.repository';
import { LessonRepository } from '../../src/lesson/repositories/lesson.repository';
import { TestAddLessonRequest } from '../fixture/dto/test-add-lesson-request';
import { TestCoachCreator } from '../fixture/entity/test-coach-creator';
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

  it('GET /lesson/times 특정 코치의 레슨 시간을 조회할 수 있다.', async () => {
    // given
    const coach = await coachRepository.save(TestCoachCreator.of());
    const requestDto = new LessonTimesRequest();
    requestDto.coachId = coach.id;
    requestDto.lessonType = LessonType.ONE_TIME;

    // when
    const response = await request(app.getHttpServer())
      .get('/lesson/times')
      .query(requestDto)
      .expect(200);

    // then
    const result = response.body.data;
    expect(result).toHaveLength(31 * 7); // 예약이 없는 경우 하루에 총 31건의 예약시간이 존재
  });

  it('POST /lesson 레슨을 예약할 수 있다.', async () => {
    // given
    const coach = await coachRepository.save(TestCoachCreator.of());
    const requestDto = TestAddLessonRequest.oneTime(
      coach.id,
      '예약자 이름',
      '01012345678',
    );

    // when
    await request(app.getHttpServer())
      .post('/lesson')
      .send(requestDto)
      .expect(201);

    // then
    const result = await lessonRepository.find();
    expect(result).toHaveLength(1);
    expect(result[0].coachId).toBe(coach.id);
    expect(result[0].customerName).toBe('예약자 이름');
    expect(result[0].customerPhone).toBe('01012345678');
  });
});
