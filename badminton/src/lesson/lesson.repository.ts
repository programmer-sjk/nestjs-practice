import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DateUtil } from '../common/date-util';
import { Lesson } from './entities/lesson.entity';
import { DayOfWeek } from './enums/day-of-week.enum';
import { LessonType } from './enums/lesson-type.enum';

@Injectable()
export class LessonRepository extends Repository<Lesson> {
  constructor(private readonly dataSource: DataSource) {
    super(Lesson, dataSource.createEntityManager());
  }

  async findSchedules(coachId: number, dayOfWeek?: DayOfWeek) {
    const builder = this.createQueryBuilder('lesson')
      .where('lesson.coachId = :coachId', { coachId })
      .andWhere(
        '(lesson.type = :regularType OR lesson.startDate >= :tomorrow)',
        {
          regularType: LessonType.REGULAR,
          tomorrow: DateUtil.now().plus({ days: 1 }).startOf('day').toJSDate(),
        },
      );

    if (dayOfWeek) {
      builder.andWhere('lesson.dayOfWeek = :dayOfWeek', { dayOfWeek });
    }
    return builder.getMany();
  }
}
