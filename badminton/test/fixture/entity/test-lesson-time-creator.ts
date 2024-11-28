import { LessonTime } from '../../../src/lesson/entities/lesson-time.entity';
import { Lesson } from '../../../src/lesson/entities/lesson.entity';
import { DayOfWeek } from '../../../src/lesson/enums/day-of-week.enum';

export class TestLessonTimeCreator {
  private constructor() {}

  static createOneTimeLessonTimes(lesson: Lesson, startDate: Date) {
    return LessonTime.of(lesson, startDate);
  }

  static createRegularLessonTimes(
    lesson: Lesson,
    dayOfWeek?: DayOfWeek,
    startTime?: string,
  ) {
    return LessonTime.of(
      lesson,
      undefined,
      dayOfWeek ?? DayOfWeek.MONDAY,
      startTime ?? '07:00',
    );
  }
}
