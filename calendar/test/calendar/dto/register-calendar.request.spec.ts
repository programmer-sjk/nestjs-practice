import { validate } from 'class-validator';
import { RegisterCalendarRequest } from '../../../src/calendar/dto/register-calendar.request';

describe('RegisterCalendarRequest', () => {
  it ('title은 문자열이며 필수 값이다.', async () => {
    // given
    const dto = new RegisterCalendarRequest();
    dto.title = undefined;

    // when
    const errors = await validate(dto);

    // then
    const titleErrors = errors.find((err) => err.property === 'title');
    expect(titleErrors.constraints).toHaveProperty('isString');
    expect(titleErrors.constraints).toHaveProperty('isNotEmpty');
  })

  it ('title의 최대 길이는 16자로 제한된다.', async () => {
    // given
    const dto = new RegisterCalendarRequest();
    dto.title = 'a'.repeat(17);

    // when
    const errors = await validate(dto);

    // then
    const titleErrors = errors.find((err) => err.property === 'title');
    expect(titleErrors.constraints).toHaveProperty('maxLength');

    const constraintsKeys = Object.keys(titleErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  })

  it ('startDate는 Date 형이며 필수 값이다.', async () => {
    // given
    const dto = new RegisterCalendarRequest();
    dto.startDate = undefined;

    // when
    const errors = await validate(dto);

    // then
    const startDateErrors = errors.find((err) => err.property === 'startDate');
    expect(startDateErrors.constraints).toHaveProperty('isDate');
    expect(startDateErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(startDateErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  })

  it ('endDate는 Date 형이며 필수 값이다.', async () => {
    // given
    const dto = new RegisterCalendarRequest();
    dto.endDate = undefined;

    // when
    const errors = await validate(dto);

    // then
    const endDateErrors = errors.find((err) => err.property === 'endDate');
    expect(endDateErrors.constraints).toHaveProperty('isDate');
    expect(endDateErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(endDateErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  })

  it ('userIds는 int형 배열이며 필수 값이다.', async () => {
    // given
    const dto = new RegisterCalendarRequest();
    dto.userIds = undefined;

    // when
    const errors = await validate(dto);

    // then
    const userIdsErrors = errors.find((err) => err.property === 'userIds');
    expect(userIdsErrors.constraints).toHaveProperty('isInt');
    expect(userIdsErrors.constraints).toHaveProperty('isArray');
    expect(userIdsErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(userIdsErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  })
})