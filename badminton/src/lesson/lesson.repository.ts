import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonType } from './enums/lesson-type.enum';

@Injectable()
export class LessonRepository extends Repository<Lesson> {
  constructor(private readonly dataSource: DataSource) {
    super(Lesson, dataSource.createEntityManager());
  }

  async findInProgressLessons(coachId: number, start: Date, end: Date) {
    return this.createQueryBuilder('lesson')
      .innerJoin('lesson.coach', 'coach')
      .innerJoinAndSelect('lesson.lessonTimes', 'lessonTimes')
      .where('coach.id = :coachId', { coachId })
      .andWhere(
        '(lesson.type = :type OR lessonTimes.startDate BETWEEN :start AND :end)',
        { type: LessonType.REGULAR, start, end },
      )
      .getMany();
  }
}
