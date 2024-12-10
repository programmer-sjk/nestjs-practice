import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonTimeRepository } from './repositories/lesson-time.repository';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './repositories/lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, LessonTimeRepository],
})
export class LessonModule {}
