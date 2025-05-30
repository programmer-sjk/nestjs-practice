import { validate } from 'class-validator';
import { AdminSignUpRequest } from '../../../src/admin/dto/admin-sign-up.request';

describe('AdminSignUpRequest', () => {
  it('email은 문자열로 최대 16글자로 필수 값이다.', async () => {
    // given
    const dto = new AdminSignUpRequest();
    dto.email = undefined;

    // when
    const errors = await validate(dto);

    // then
    const emailErrors = errors.find((err) => err.property === 'email');
    expect(emailErrors.constraints).toHaveProperty('isString');
    expect(emailErrors.constraints).toHaveProperty('maxLength');
    expect(emailErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(emailErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });

  it('password는 문자열로 필수 값이다.', async () => {
    // given
    const dto = new AdminSignUpRequest();
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
