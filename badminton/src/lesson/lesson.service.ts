import { Injectable } from '@nestjs/common';
import { DayUtil } from './../common/DayUtil';
import { LessonTimePeriod } from './dto/lesson-time-period';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonTimesResponse } from './dto/lesson-times-response';
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

    const lessonTimes = lessons.flatMap(this.convertLessonTimeByType);
    return this.ALL_LESSON_TIMES.filter((time) =>
      this.isAvailableTime(time, lessonTimes),
    ).map((time) => new LessonTimesResponse(time.start, time.end));
  }

  private getAllLessonTimes() {
    const now = DayUtil.now();

    const result: LessonTimePeriod[] = [];
    for (let day = ReservablePeriod.START; day < ReservablePeriod.END; day++) {
      const start = DayUtil.add(now, day, LessonTime.START_HOUR);
      const end = DayUtil.add(now, day, LessonTime.END_HOUR);

      let currentStart = start;
      let currentEnd = DayUtil.addHour(start, this.LESSON_HOUR);

      while (DayUtil.isSameOrBefore(currentEnd, end)) {
        result.push(
          new LessonTimePeriod(currentStart.toDate(), currentEnd.toDate()),
        );
        currentStart = currentEnd;
        currentEnd = DayUtil.addHour(currentEnd, this.LESSON_HOUR);
      }
    }
    return result;
  }

  private convertLessonTimeByType(lesson: Lesson) {
    return lesson.lessonTimes.map(
      (lessonTime) =>
        new LessonTimePeriod(
          lessonTime.getStartDate(),
          lessonTime.getEndDate(),
        ),
    );
  }

  private isAvailableTime(
    time: LessonTimePeriod,
    lessonTimes: LessonTimePeriod[],
  ) {
    for (const lessonTime of lessonTimes) {
      if (
        this.isDateRangeOverlap(
          time.start,
          time.end,
          lessonTime.start,
          lessonTime.end,
        )
      ) {
        return true;
      }
    }

    return false;
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
