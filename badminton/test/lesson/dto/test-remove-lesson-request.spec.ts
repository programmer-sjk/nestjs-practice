import { validate } from 'class-validator';
import { RemoveLessonRequest } from '../../../src/lesson/dto/remove-lesson-request';

describe('RemoveLessonRequest', () => {
  it('lessonId는 숫자형이며 필수 값이다.', async () => {
    // given
    const dto = new RemoveLessonRequest();
    dto.lessonId = undefined;

    // when
    const errors = await validate(dto);

    // then
    const lessonIdErrors = errors.find((err) => err.property === 'lessonId');
    expect(lessonIdErrors.constraints).toHaveProperty('isInt');
    expect(lessonIdErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(lessonIdErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('customerPhone은 11자리 핸드폰 번호 형식이며 필수 값이다.', async () => {
    // given
    const dto = new RemoveLessonRequest();
    dto.customerPhone = undefined;

    // when
    const errors = await validate(dto);

    // then
    const customerPhoneErrors = errors.find(
      (err) => err.property === 'customerPhone',
    );
    expect(customerPhoneErrors.constraints).toHaveProperty('isPhoneNumber');
    expect(customerPhoneErrors.constraints).toHaveProperty('isNotEmpty');
    expect(customerPhoneErrors.constraints).toHaveProperty('maxLength');

    const constraintsKeys = Object.keys(customerPhoneErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });

  it('password는 문자열이며 필수 값이다.', async () => {
    // given
    const dto = new RemoveLessonRequest();
    dto.password = undefined;

    // when
    const errors = await validate(dto);

    // then
    const passwordErrors = errors.find((err) => err.property === 'password');
    expect(passwordErrors.constraints).toHaveProperty('isString');
    expect(passwordErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(passwordErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
