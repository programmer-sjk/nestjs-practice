import { AddLessonRequest } from '../../../src/lesson/dto/add-lesson-request';
import { LessonType } from '../../../src/lesson/enums/lesson-type.enum';
import { TestLessonTimeDto } from './test-lesson-time-dto';

export class TestAddLessonRequest {
  private constructor() {}

  static oneTime(coachId: number, customerName: string, customerPhone: string) {
    const dto = new AddLessonRequest();
    dto.coachId = coachId;
    dto.type = LessonType.ONE_TIME;
    dto.customerName = customerName;
    dto.customerPhone = customerPhone;
    dto.lessonTimes = [TestLessonTimeDto.oneTime()];

    return dto;
  }
}
