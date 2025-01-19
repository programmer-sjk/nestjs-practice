import { validate } from 'class-validator';
import { AddUserRequest } from './../../../src/user/dto/add-user.request';

describe('AddUserRequest', () => {
  it ('name은 문자열이며 필수 값이다.', async () => {
    // given
    const dto = new AddUserRequest();
    dto.name = undefined;

    // when
    const errors = await validate(dto);

    // then
    const nameErrors = errors.find((err) => err.property === 'name');
    expect(nameErrors.constraints).toHaveProperty('isString');
    expect(nameErrors.constraints).toHaveProperty('isNotEmpty');
  })

  it ('name의 최대 길이는 16자로 제한된다.', async () => {
    // given
    const dto = new AddUserRequest();
    dto.name = 'a'.repeat(17);

    // when
    const errors = await validate(dto);

    // then
    const nameErrors = errors.find((err) => err.property === 'name');
    expect(nameErrors.constraints).toHaveProperty('maxLength');

    const constraintsKeys = Object.keys(nameErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  })
})