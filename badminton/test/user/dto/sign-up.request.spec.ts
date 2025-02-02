import { validate } from "class-validator";
import { SignUpRequest } from "../../../src/user/dto/sign-up.request";

describe('SignUpRequest', () => {
  it('name은 문자열로 필수값이며 최대 16자로 제한된다.', async () => {
    // given
    const dto = new SignUpRequest();
    dto.name = undefined;

    // when
    const errors = await validate(dto);

    // then
    const nameErrors = errors.find((err) => err.property === 'name');
    expect(nameErrors.constraints).toHaveProperty('isString');
    expect(nameErrors.constraints).toHaveProperty('isNotEmpty');
    expect(nameErrors.constraints).toHaveProperty('maxLength');

    const constraintsKeys = Object.keys(nameErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });

  it('email은 문자열로 필수값이며 최대 32자로 제한된다.', async () => {
    // given
    const dto = new SignUpRequest();
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
    const dto = new SignUpRequest();
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
})