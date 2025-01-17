import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { LessonType } from '../enums/lesson-type.enum';

@Injectable()
export class LessonRepository extends Repository<Lesson> {
  constructor(private readonly dataSource: DataSource) {
    super(Lesson, dataSource.createEntityManager());
  }

  async findInProgress(coachId: number, start: Date, end: Date) {
    const lessons = await this.createQueryBuilder('lesson')
      .innerJoin('lesson.coach', 'coach')
      .innerJoinAndSelect('lesson.lessonTimes', 'lessonTimes')
      .where('coach.id = :coachId', { coachId })
      .andWhere(
        '(lesson.type = :type OR lessonTimes.startDate BETWEEN :start AND :end)',
        { type: LessonType.REGULAR, start, end },
      )
      .getMany();

    lessons.map((lesson) => lesson.updateLessonTimes(lesson.lessonTimes));
    return lessons;
  }
}
