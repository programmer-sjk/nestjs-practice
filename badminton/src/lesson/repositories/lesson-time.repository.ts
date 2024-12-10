import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LessonTime } from '../entities/lesson-time.entity';

@Injectable()
export class LessonTimeRepository extends Repository<LessonTime> {
  constructor(private readonly dataSource: DataSource) {
    super(LessonTime, dataSource.createEntityManager());
  }
}
