import { DayOfWeek } from '../../../src/lesson/enums/day-of-week.enum';
import { LessonType } from '../../../src/lesson/enums/lesson-type.enum';
import { Lesson } from './../../../src/lesson/entities/lesson.entity';

export class TestLessonCreator {
  private constructor() {}

  static of(startHour: number) {
    const lesson = new Lesson();
    lesson.type = LessonType.REGULAR;
    lesson.dayOfWeek = DayOfWeek.MONDAY;
    lesson.startHour = startHour;
    return lesson;
  }

  static regular(startHour?: number) {
    const lesson = new Lesson();
    lesson.type = LessonType.REGULAR;
    lesson.dayOfWeek = DayOfWeek.MONDAY;
    lesson.startHour = startHour ?? 15;
    return lesson;
  }

  static oneTime() {
    const lesson = new Lesson();
    lesson.type = LessonType.ONE_TIME;
    lesson.dayOfWeek = DayOfWeek.MONDAY;
    lesson.startDate = new Date();
    lesson.coachId = 1;
    lesson.userId = 1;
    return lesson;
  }
}
