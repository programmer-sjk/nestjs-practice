import { validate } from 'class-validator';
import { CouponRegisterRequest } from '../../../src/coupon/dto/coupon-register.request';

describe('CouponRegisterRequest', () => {
  it('name은 문자열로 최대 32글자로 필수 값이다.', async () => {
    // given
    const dto = new CouponRegisterRequest();
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

  it('type은 CouponType Enum으로 필수 값이다.', async () => {
    // given
    const dto = new CouponRegisterRequest();
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

  it('value는 int형 타입으로 필수 값이다.', async () => {
    // given
    const dto = new CouponRegisterRequest();
    dto.value = undefined;

    // when
    const errors = await validate(dto);

    // then
    const valueErrors = errors.find((err) => err.property === 'value');
    expect(valueErrors.constraints).toHaveProperty('isInt');
    expect(valueErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(valueErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('stock은 int형 타입으로 필수 값이다.', async () => {
    // given
    const dto = new CouponRegisterRequest();
    dto.stock = undefined;

    // when
    const errors = await validate(dto);

    // then
    const stockErrors = errors.find((err) => err.property === 'stock');
    expect(stockErrors.constraints).toHaveProperty('isInt');
    expect(stockErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(stockErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('categoryId는 int형 타입으로 옵셔널 값이다.', async () => {
    // given
    const dto = new CouponRegisterRequest();
    dto.categoryId = undefined;

    // when
    const errors = await validate(dto);

    // then
    const categoryIdErrors = errors.find(
      (err) => err.property === 'categoryId',
    );
    expect(categoryIdErrors).toBeUndefined();
  });

  it('description은 문자열로 옵셔널 값이다.', async () => {
    // given
    const dto = new CouponRegisterRequest();
    dto.description = undefined;

    // when
    const errors = await validate(dto);

    // then
    const descriptionErrors = errors.find(
      (err) => err.property === 'description',
    );
    expect(descriptionErrors).toBeUndefined();
  });
});
