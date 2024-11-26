import { Controller, Get } from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async lessons(): Promise<string> {
    await this.lessonService.findAvilableLessons();
    return 'aaa';
  }
}
