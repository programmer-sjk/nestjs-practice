import { validate } from 'class-validator';
import { SignInRequest } from '../../../src/auth/dto/sigin-in.request';

describe('SignInRequest', () => {
  it('email은 문자열로 필수값이며 최대 32자로 제한된다.', async () => {
    // given
    const dto = new SignInRequest();
    dto.email = undefined;

    // when
    const errors = await validate(dto);

    // then
    const emailErrors = errors.find((err) => err.property === 'email');
    expect(emailErrors.constraints).toHaveProperty('isString');
    expect(emailErrors.constraints).toHaveProperty('isNotEmpty');
    expect(emailErrors.constraints).toHaveProperty('maxLength');

    const constraintsKeys = Object.keys(emailErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });

  it('password는 문자열로 필수값이다.', async () => {
    // given
    const dto = new SignInRequest();
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
