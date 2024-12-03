import { validate } from 'class-validator';
import { OrderItemType } from '../../../src/order/enum/order-item-type.enum';
import { OrderItemDto } from './../../../src/order/dto/order-item-dto';

describe('OrderItemDto', () => {
  it('type은 Enum OrderItemType이며 필수 값이다. ', async () => {
    // given
    const dto = new OrderItemDto();
    dto.type = '' as OrderItemType;

    // when
    const errors = await validate(dto);

    // then
    const typeErrors = errors.find((err) => err.property === 'type');
    expect(typeErrors.constraints).toHaveProperty('isEnum');
    expect(typeErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(typeErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('category는 문자열이며 필수값이다.', async () => {
    // given
    const dto = new OrderItemDto();
    dto.category = undefined;

    // when
    const errors = await validate(dto);

    // then
    const categoryError = errors.find((err) => err.property === 'category');
    expect(categoryError.constraints).toHaveProperty('isString');
    expect(categoryError.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(categoryError.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('subCategory는 문자열이며 필수값이다', async () => {
    // given
    const dto = new OrderItemDto();
    dto.subCategory = undefined;

    // when
    const errors = await validate(dto);

    // then
    const subCategoryError = errors.find(
      (err) => err.property === 'subCategory',
    );
    expect(subCategoryError.constraints).toHaveProperty('isString');
    expect(subCategoryError.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(subCategoryError.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('count는 숫자형이며 필수값이다.', async () => {
    // given
    const dto = new OrderItemDto();
    dto.count = undefined;

    // when
    const errors = await validate(dto);

    // then
    const countError = errors.find((err) => err.property === 'count');
    expect(countError.constraints).toHaveProperty('isNumber');
    expect(countError.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(countError.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
