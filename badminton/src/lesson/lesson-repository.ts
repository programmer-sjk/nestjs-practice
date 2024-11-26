import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonRepository extends Repository<Lesson> {
  constructor(private readonly dataSource: DataSource) {
    super(Lesson, dataSource.createEntityManager());
  }
}
