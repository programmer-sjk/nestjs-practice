import { validate } from 'class-validator';
import { OrderType } from '../../../src/order/enum/order-type.enum';
import { AddOrderRequest } from './../../../src/order/dto/add-order-request';

describe('AddOrderRequest', () => {
  it('type은 Enum OrderType이며 필수값이다.', async () => {
    // given
    const dto = new AddOrderRequest();
    dto.type = '' as OrderType;

    // when
    const errors = await validate(dto);

    // then
    const typeErrors = errors.find((err) => err.property === 'type');
    expect(typeErrors.constraints).toHaveProperty('isEnum');
    expect(typeErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(typeErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });

  it('orderItemDtos은 orderItemDto의 배열로 최소 하나의 값이 있어야 하며 필수값이다.', async () => {
    // given
    const dto = new AddOrderRequest();
    dto.orderItemDtos = undefined;

    // when
    const errors = await validate(dto);

    // then
    const orderItemDtosErrors = errors.find(
      (err) => err.property === 'orderItemDtos',
    );
    expect(orderItemDtosErrors.constraints).toHaveProperty('isArray');
    expect(orderItemDtosErrors.constraints).toHaveProperty('arrayMinSize');
    expect(orderItemDtosErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(orderItemDtosErrors.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });
});
