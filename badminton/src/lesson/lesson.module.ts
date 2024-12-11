import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';
import { Lesson } from './entities/lesson.entity';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonTimeRepository } from './repositories/lesson-time.repository';
import { LessonRepository } from './repositories/lesson.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), RedisModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository, LessonTimeRepository],
})
export class LessonModule {}
