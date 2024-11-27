import { Injectable } from '@nestjs/common';
import { DayUtil } from './../common/DayUtil';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonTime } from './entities/lesson-time.entity';
import { Lesson } from './entities/lesson.entity';
import { ReservablePeriod } from './enums/reservable-period.enum';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  private readonly LESSON_HOUR = 1;
  private readonly ALL_LESSON_TIMES = this.getAllLessonTimes();

  constructor(private readonly lessonRepository: LessonRepository) {}

  async findAvailableLessons(dto: LessonTimesRequest) {
    const lessons = await this.lessonRepository.findInProgressLessons(
      dto.coachId,
      DayUtil.addFromNow(ReservablePeriod.START).toDate(),
      DayUtil.addFromNow(ReservablePeriod.END).toDate(),
    );

    const lessonTimes = lessons.map(this.convertLessonTimeByType);
    this.ALL_LESSON_TIMES.filter((time) => isAvailableTime(lessonTimes));
  }

  private getAllLessonTimes() {
    const now = DayUtil.now();

    const result = [];
    for (let day = ReservablePeriod.START; day < ReservablePeriod.END; day++) {
      const start = DayUtil.add(now, day, LessonTime.START_HOUR);
      const end = DayUtil.add(now, day, LessonTime.END_HOUR);

      let currentStart = start;
      let currentEnd = DayUtil.addHour(start, this.LESSON_HOUR);

      while (DayUtil.isSameOrBefore(currentEnd, end)) {
        result.push({ start: currentStart.toDate(), end: currentEnd.toDate() });
        currentStart = currentEnd;
        currentEnd = DayUtil.addHour(currentEnd, this.LESSON_HOUR);
      }
    }
    return result;
  }

  private convertLessonTimeByType(lesson: Lesson) {
    return lesson.lessonTimes.map((lessonTime) => ({
      start: lessonTime.getStartDate(),
      end: lessonTime.getEndDate(),
    }));
  }

  private isDateRangeOverlap(
    startA: Date,
    endA: Date,
    startB: Date,
    endB: Date,
  ) {
    if (startA < endB && endA > startB) {
      return true;
    }

    return false;
  }
}
