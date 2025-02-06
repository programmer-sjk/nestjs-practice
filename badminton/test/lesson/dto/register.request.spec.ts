import { validate } from 'class-validator';
import { RegisterRequest } from '../../../src/lesson/dto/register.request';

describe('RegisterRequest', () => {
  it('coachId는 정수형으로 필수값이다.', async () => {
    // given
    const dto = new RegisterRequest();
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

  it('userId는 정수형으로 필수값이다.', async () => {
    // given
    const dto = new RegisterRequest();
    dto.userId = undefined;

    // when
    const errors = await validate(dto);

    // then
    const userIdErrors = errors.find((err) => err.property === 'userId');
    expect(userIdErrors.constraints).toHaveProperty('isInt');
    expect(userIdErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(userIdErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('type은 LessonType Enum형으로 필수값이다.', async () => {
    // given
    const dto = new RegisterRequest();
    dto.type = undefined;

    // when
    const errors = await validate(dto);

    // then
    const typeErrors = errors.find((err) => err.property === 'type');
    expect(typeErrors.constraints).toHaveProperty('isEnum');
    expect(typeErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(typeErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('dayOfWeek는 DayOfWeek Enum형으로 필수값이다.', async () => {
    // given
    const dto = new RegisterRequest();
    dto.dayOfWeek = undefined;

    // when
    const errors = await validate(dto);

    // then
    const dayOfWeekErrors = errors.find((err) => err.property === 'dayOfWeek');
    expect(dayOfWeekErrors.constraints).toHaveProperty('isEnum');
    expect(dayOfWeekErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(dayOfWeekErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
