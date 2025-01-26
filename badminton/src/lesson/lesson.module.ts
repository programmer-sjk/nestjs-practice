import { Module } from '@nestjs/common';
import { CoachModule } from '../coach/coach.module';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [CoachModule],
  providers: [LessonService, LessonRepository],
  controllers: [LessonController],
})
export class LessonModule {}
