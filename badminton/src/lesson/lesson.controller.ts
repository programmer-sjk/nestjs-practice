import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReponseEntity } from './../common/response-entity';
import { AddLessonRequest } from './dto/add-lesson-request';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonTimesResponse } from './dto/lesson-times-response';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('/times')
  async lessons(
    @Query() request: LessonTimesRequest,
  ): Promise<ReponseEntity<LessonTimesResponse[] | string>> {
    try {
      const lessons = await this.lessonService.findAvailableLessons(request);
      return ReponseEntity.OK(lessons);
    } catch (e) {
      return ReponseEntity.ERROR(e.message);
    }
  }

  @Post()
  async addLesson(@Body() request: AddLessonRequest): Promise<string> {
    await this.lessonService.addLesson(request);
    return 'aa';
  }
}
