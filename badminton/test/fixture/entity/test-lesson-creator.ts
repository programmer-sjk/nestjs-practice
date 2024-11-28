import { Lesson } from '../../../src/lesson/entities/lesson.entity';
import { LessonType } from '../../../src/lesson/enums/lesson-type.enum';
import { LessonTime } from './../../../src/lesson/entities/lesson-time.entity';

export class TestLessonCreator {
  private constructor() {}

  static createOneTimeLesson() {
    const coachId = 1;
    return Lesson.of(
      LessonType.ONE_TIME,
      coachId,
      LessonTime.LESSON_MINUTE,
      'customerName',
      'customerPhone',
    );
  }

  static createRegularLesson() {
    const coachId = 1;
    return Lesson.of(
      LessonType.REGULAR,
      coachId,
      LessonTime.LESSON_MINUTE,
      'customerName',
      'customerPhone',
    );
  }
}
