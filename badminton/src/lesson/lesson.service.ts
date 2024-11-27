import { BadRequestException, Injectable } from '@nestjs/common';
import { hash, random } from '../common/crypt';
import { DayUtil } from '../common/day-util';
import { AddLessonRequest } from './dto/add-lesson-request';
import { AddLessonResponse } from './dto/add-lesson-response';
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
  private readonly PASSWORD_LENGTH = 8;
  private readonly ALL_LESSON_TIMES = this.getAllLessonTimes();

  constructor(private readonly lessonRepository: LessonRepository) {}

  async findAvailableLessons(request: LessonTimesRequest) {
    const lessons = await this.findInProgressLessons(request.coachId);

    const lessonTimes = lessons.flatMap(this.convertLessonTimeByType);
    return this.ALL_LESSON_TIMES.filter((time) =>
      this.isAvailableTime(time, lessonTimes),
    ).map((time) => new LessonTimesResponse(time.start, time.end));
  }

  async addLesson(request: AddLessonRequest) {
    const newLesson = request.toEntity();
    await this.validateAddLesson(newLesson);

    const password = random(this.PASSWORD_LENGTH);
    newLesson.updatePassword(hash(password));
    await this.lessonRepository.save(newLesson);

    return new AddLessonResponse(newLesson.customerPhone, password);
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

  private async validateAddLesson(lesson: Lesson) {
    lesson.validateLessonTimes();
    await this.validateDuplicateLesson(lesson);
  }

  private async validateDuplicateLesson(lesson: Lesson) {
    const newLessonTimes = this.convertLessonTimeByType(lesson);
    const existLessons = await this.findInProgressLessons(lesson.coach.id);
    const lessonTimes = existLessons.flatMap(this.convertLessonTimeByType);

    for (const newLessonTime of newLessonTimes) {
      for (const lessonTime of lessonTimes) {
        if (
          this.isDateRangeOverlap(
            newLessonTime.start,
            newLessonTime.end,
            lessonTime.start,
            lessonTime.end,
          )
        ) {
          throw new BadRequestException('이미 예약된 레슨 시간입니다.');
        }
      }
    }
  }

  private findInProgressLessons(coachId: number) {
    return this.lessonRepository.findInProgress(
      coachId,
      DayUtil.addFromNow(ReservablePeriod.START).toDate(),
      DayUtil.addFromNow(ReservablePeriod.END).toDate(),
    );
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
