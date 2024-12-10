import { validate } from 'class-validator';
import { LessonTimesRequest } from './../../../src/lesson/dto/lesson-times-request';

describe('LessonTimesRequest', () => {
  it('coachId는 숫자형이며 필수 값이다.', async () => {
    // given
    const dto = new LessonTimesRequest();
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

  it('lessonType은 enum LessonType 형이며 필수 값이다.', async () => {
    // given
    const dto = new LessonTimesRequest();
    dto.lessonType = undefined;

    // when
    const errors = await validate(dto);

    // then
    const lessonTypeErrors = errors.find(
      (err) => err.property === 'lessonType',
    );
    expect(lessonTypeErrors.constraints).toHaveProperty('isEnum');
    expect(lessonTypeErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(lessonTypeErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
