import { validate } from 'class-validator';
import { CategoryRegisterRequest } from '../../../src/category/dto/category-register.request';

describe('CategoryRegisterRequest', () => {
  it('name은 문자열로 최대 16글자로 필수 값이다.', async () => {
    // given
    const dto = new CategoryRegisterRequest();
    dto.name = undefined;

    // when
    const errors = await validate(dto);

    // then
    const nameErrors = errors.find((err) => err.property === 'name');
    expect(nameErrors.constraints).toHaveProperty('isString');
    expect(nameErrors.constraints).toHaveProperty('maxLength');
    expect(nameErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(nameErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });
});
