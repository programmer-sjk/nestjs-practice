import { validate } from 'class-validator';
import { LessonTimeDto } from '../../../src/lesson/dto/lesson-time-dto';
import { DayOfWeek } from '../../../src/lesson/enums/day-of-week.enum';

describe('LessonTimeDto', () => {
  it('dayOfWeek은 enum DayOfWeek이며 옵셔널 값이다.', async () => {
    // given
    const dto = new LessonTimeDto();
    dto.dayOfWeek = '' as DayOfWeek;

    // when
    const errors = await validate(dto);

    // then
    const dayOfWeekErrors = errors.find((err) => err.property === 'dayOfWeek');
    expect(dayOfWeekErrors.constraints).toHaveProperty('isEnum');

    const constraintsKeys = Object.keys(dayOfWeekErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  });

  it('startDate는 Date 형이며 옵셔널 값이다.', async () => {
    // given
    const dto = new LessonTimeDto();
    dto.startDate = new Date();

    // when
    const errors = await validate(dto);

    // then
    const startDateErrors = errors.find((err) => err.property === 'startDate');
    expect(startDateErrors).toBeUndefined();
  });

  it('startTime은 5글자의 문자열이며 옵셔널 값이다.', async () => {
    // given
    const dto = new LessonTimeDto();
    dto.startTime = '1400';

    // when
    const errors = await validate(dto);

    // then
    const startTimeErrors = errors.find((err) => err.property === 'startTime');
    expect(startTimeErrors.constraints).toHaveProperty('isLength');

    const constraintsKeys = Object.keys(startTimeErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  });
});
