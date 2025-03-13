import { validate } from 'class-validator';
import { ProductRegisterRequest } from '../../../src/product/dto/product-register.request';

describe('ProductRegisterRequest', () => {
  it('name은 문자열로 최대 32글자로 필수 값이다.', async () => {
    // given
    const dto = new ProductRegisterRequest();
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

  it('price는 int형 타입으로 필수 값이다.', async () => {
    // given
    const dto = new ProductRegisterRequest();
    dto.price = undefined;

    // when
    const errors = await validate(dto);

    // then
    const priceErrors = errors.find((err) => err.property === 'price');
    expect(priceErrors.constraints).toHaveProperty('isInt');
    expect(priceErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(priceErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('stock은 int형 타입으로 필수 값이다.', async () => {
    // given
    const dto = new ProductRegisterRequest();
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

  it('categoryId는 int형 타입으로 필수 값이다.', async () => {
    // given
    const dto = new ProductRegisterRequest();
    dto.categoryId = undefined;

    // when
    const errors = await validate(dto);

    // then
    const categoryIdErrors = errors.find(
      (err) => err.property === 'categoryId',
    );
    expect(categoryIdErrors.constraints).toHaveProperty('isInt');
    expect(categoryIdErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(categoryIdErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
