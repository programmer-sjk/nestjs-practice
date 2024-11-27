import { Controller, Get, Query } from '@nestjs/common';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get('/times')
  async lessons(@Query() query: LessonTimesRequest): Promise<string> {
    await this.lessonService.findAvailableLessons(query);
    return 'aaa';
  }
}
