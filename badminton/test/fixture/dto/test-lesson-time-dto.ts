import { DayUtil } from '../../../src/common/day-util';
import { LessonTimeDto } from './../../../src/lesson/dto/lesson-time-dto';

export class TestLessonTimeDto {
  private constructor() {}

  static oneTime() {
    const lessonHour = 7;

    const dto = new LessonTimeDto();
    dto.startDate = DayUtil.addFromNow(1, lessonHour).toDate();
    return dto;
  }
}
