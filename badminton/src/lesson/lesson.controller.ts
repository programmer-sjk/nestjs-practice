import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ReponseEntity } from './../common/response-entity';
import { AddLessonRequest } from './dto/add-lesson-request';
import { AddLessonResponse } from './dto/add-lesson-response';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonTimesResponse } from './dto/lesson-times-response';
import { RemoveLessonRequest } from './dto/remove-lesson-request';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('/times')
  async lessons(
    @Query() request: LessonTimesRequest,
  ): Promise<ReponseEntity<LessonTimesResponse[] | string>> {
    try {
      const data = await this.lessonService.findAvailableLessons(request);
      return ReponseEntity.OK(data);
    } catch (e) {
      return ReponseEntity.ERROR(e.message);
    }
  }

  @Post()
  async addLesson(
    @Body() request: AddLessonRequest,
  ): Promise<ReponseEntity<AddLessonResponse | string>> {
    try {
      const data = await this.lessonService.addLesson(request);
      return ReponseEntity.OK(data);
    } catch (e) {
      return ReponseEntity.ERROR(e.message);
    }
  }

  @Delete()
  async removeLesson(
    @Body() request: RemoveLessonRequest,
  ): Promise<ReponseEntity<AddLessonResponse | string>> {
    try {
      const data = await this.lessonService.remove(request);
      return ReponseEntity.OK();
    } catch (e) {
      return ReponseEntity.ERROR(e.message);
    }
  }
}
