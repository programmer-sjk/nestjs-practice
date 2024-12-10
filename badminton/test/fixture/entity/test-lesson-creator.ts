import { Lesson } from '../../../src/lesson/entities/lesson.entity';
import { LessonType } from '../../../src/lesson/enums/lesson-type.enum';
import { LessonTime } from './../../../src/lesson/entities/lesson-time.entity';

export class TestLessonCreator {
  private constructor() {}

  static createOneTimeLesson(coachId?: number) {
    const lesson = Lesson.of(
      LessonType.ONE_TIME,
      coachId ?? 1,
      LessonTime.LESSON_MINUTE,
      'customerName',
      '01012345678',
    );
    lesson.updatePassword('password');

    return lesson;
  }

  static createRegularLesson(coachId?: number) {
    const lesson = Lesson.of(
      LessonType.REGULAR,
      coachId ?? 1,
      LessonTime.LESSON_MINUTE,
      'customerName',
      '01012345678',
    );
    lesson.updatePassword('password');

    return lesson;
  }
}
