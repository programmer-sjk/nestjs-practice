import { Module } from '@nestjs/common';
import { CoachModule } from '../coach/coach.module';
import { RedisModule } from '../redis/redis.module';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [CoachModule, RedisModule],
  providers: [LessonService, LessonRepository],
  controllers: [LessonController],
})
export class LessonModule {}
