import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './../ormconfig';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), LessonModule],
})
export class AppModule {}
