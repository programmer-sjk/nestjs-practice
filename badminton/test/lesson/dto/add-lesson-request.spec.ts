import { validate } from 'class-validator';
import { LessonType } from '../../../src/lesson/enums/lesson-type.enum';
import { AddLessonRequest } from './../../../src/lesson/dto/add-lesson-request';

describe('AddLessonRequest', () => {
  it('type은 enum LessonType이며 필수 값이다.', async () => {
    // given
    const dto = new AddLessonRequest();
    dto.type = '' as LessonType;

    // when
    const errors = await validate(dto);

    // then
    const typeErrors = errors.find((err) => err.property === 'type');
    expect(typeErrors.constraints).toHaveProperty('isEnum');
    expect(typeErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(typeErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('coachId는 숫자형이며 필수 값이다.', async () => {
    // given
    const dto = new AddLessonRequest();
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

  it('customerName은 문자열이며 필수 값이다.', async () => {
    // given
    const dto = new AddLessonRequest();
    dto.customerName = '';

    // when
    const errors = await validate(dto);

    // then
    const customerNameErrors = errors.find(
      (err) => err.property === 'customerName',
    );
    expect(customerNameErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(customerNameErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  });

  it('customerPhone은 전화번호 문자열이며 필수 값이다.', async () => {
    // given
    const dto = new AddLessonRequest();
    dto.customerPhone = '';

    // when
    const errors = await validate(dto);

    // then
    const customerPhoneErrors = errors.find(
      (err) => err.property === 'customerPhone',
    );
    expect(customerPhoneErrors.constraints).toHaveProperty('isPhoneNumber');
    expect(customerPhoneErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(customerPhoneErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('lessonTimes은 LessonTimeDto 타입의 배열이며 필수 값이다.', async () => {
    // given
    const dto = new AddLessonRequest();
    dto.lessonTimes = [];

    // when
    const errors = await validate(dto);

    // then
    const lessonTimesErrors = errors.find(
      (err) => err.property === 'lessonTimes',
    );
    expect(lessonTimesErrors.constraints).toHaveProperty('arrayMinSize');

    const constraintsKeys = Object.keys(lessonTimesErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  });
});
