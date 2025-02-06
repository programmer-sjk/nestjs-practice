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

  describe('startHour', () => {
    it('startHour의 최소값은 7이다.', async () => {
      // given
      const dto = new RegisterRequest();
      dto.startHour = 7;

      // when
      const errors = await validate(dto);

      // then
      const startHourErrors = errors.find(
        (err) => err.property === 'startHour',
      );
      expect(startHourErrors).toBeUndefined();
    });

    it('startHour이 최소값 7보다 작을수 없다.', async () => {
      // given
      const dto = new RegisterRequest();
      dto.startHour = 6;

      // when
      const errors = await validate(dto);

      // then
      const startHourErrors = errors.find(
        (err) => err.property === 'startHour',
      );
      expect(startHourErrors.constraints).toHaveProperty('min');

      const constraintsKeys = Object.keys(startHourErrors.constraints);
      expect(constraintsKeys).toHaveLength(1);
    });

    it('startHour의 최대값은 22이다.', async () => {
      // given
      const dto = new RegisterRequest();
      dto.startHour = 22;

      // when
      const errors = await validate(dto);

      // then
      const startHourErrors = errors.find(
        (err) => err.property === 'startHour',
      );
      expect(startHourErrors).toBeUndefined();
    });

    it('startHour이 최대값보다 클 수 없다.', async () => {
      // given
      const dto = new RegisterRequest();
      dto.startHour = 23;

      // when
      const errors = await validate(dto);

      // then
      const startHourErrors = errors.find(
        (err) => err.property === 'startHour',
      );
      expect(startHourErrors.constraints).toHaveProperty('max');

      const constraintsKeys = Object.keys(startHourErrors.constraints);
      expect(constraintsKeys).toHaveLength(1);
    });
  });

  it('startDate는 Date형으로 옵셔널 값이다.', async () => {
    // given
    const dto = new RegisterRequest();
    dto.startDate = undefined;

    // when
    const errors = await validate(dto);

    // then
    const startDateErrors = errors.find((err) => err.property === 'startDate');
    expect(startDateErrors).toBeUndefined();
  });
});
