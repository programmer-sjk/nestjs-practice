import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './../ormconfig';
import { CoachModule } from './coach/coach.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    CoachModule,
    LessonModule,
  ],
})
export class AppModule {}
