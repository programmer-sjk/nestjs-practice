import { validate } from 'class-validator';
import { SignInRequest } from '../../../src/auth/dto/sigin-in.request';
import { LessonScheduleRequest } from '../../../src/lesson/dto/lesson-schedule.request';

describe('LessonScheduleRequest', () => {
  it('coachId는 정수형으로 필수값이다.', async () => {
    // given
    const dto = new LessonScheduleRequest();
    dto.coachId = undefined;

    // when
    const errors = await validate(dto);

    // then
    const coachIdErrors = errors.find((err) => err.property === 'coachId');
    expect(coachIdErrors.constraints).toHaveProperty('isInt');
    expect(coachIdErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(coachIdErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
