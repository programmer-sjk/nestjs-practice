import { Controller, Get, Query } from '@nestjs/common';
import { ReponseEntity } from './../common/response-entity';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonTimesResponse } from './dto/lesson-times-response';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('/times')
  async lessons(
    @Query() query: LessonTimesRequest,
  ): Promise<ReponseEntity<LessonTimesResponse[] | string>> {
    try {
      const lessons = await this.lessonService.findAvailableLessons(query);
      return ReponseEntity.OK(lessons);
    } catch (e) {
      return ReponseEntity.ERROR(e.message);
    }
  }
}
