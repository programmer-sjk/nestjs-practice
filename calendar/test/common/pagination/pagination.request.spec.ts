import { validate } from 'class-validator';
import { PaginationRequest } from '../../../src/common/pagination/pagination.request';

describe('PaginationRequest', () => {
  it('offset은 int형이며 옵셔널한 값이다.', async () => {
    // given
    const dto = new PaginationRequest();
    dto.offset = undefined;

    // when
    const errors = await validate(dto);

    // then
    const offsetErrors = errors.find((err) => err.property === 'offset');
    expect(offsetErrors).toBeUndefined();
  });

  it('limit은 int형이며 필수 값이다.', async () => {
    // given
    const dto = new PaginationRequest();
    dto.limit = undefined;

    // when
    const errors = await validate(dto);

    // then
    const limitErrors = errors.find((err) => err.property === 'limit');
    expect(limitErrors.constraints).toHaveProperty('isInt');
    expect(limitErrors.constraints).toHaveProperty('isNotEmpty');
  });

  it('limit의 최소 값은 1이다.', async () => {
    // given
    const dto = new PaginationRequest();
    dto.limit = 0;

    // when
    const errors = await validate(dto);

    // then
    const limitErrors = errors.find((err) => err.property === 'limit');
    expect(limitErrors.constraints).toHaveProperty('min');

    const constraintsKeys = Object.keys(limitErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  });

  it('limit의 최대 값은 20이다.', async () => {
    // given
    const dto = new PaginationRequest();
    dto.limit = 21;

    // when
    const errors = await validate(dto);

    // then
    const limitErrors = errors.find((err) => err.property === 'limit');
    expect(limitErrors.constraints).toHaveProperty('max');

    const constraintsKeys = Object.keys(limitErrors.constraints);
    expect(constraintsKeys).toHaveLength(1);
  });
});
