import { validate } from 'class-validator';
import { ReturnOrderRequest } from '../../../src/order/dto/return-order-request';

describe('ReturnOrderRequest', () => {
  it('orderItemIds은 숫자형 배열로 최소 하나의 요소를 가지며 필수값이다.', async () => {
    // given
    const dto = new ReturnOrderRequest();
    dto.orderItemIds = undefined;

    // when
    const errors = await validate(dto);

    // then
    const orderItemIdsError = errors.find(
      (err) => err.property === 'orderItemIds',
    );
    expect(orderItemIdsError.constraints).toHaveProperty('isArray');
    expect(orderItemIdsError.constraints).toHaveProperty('arrayMinSize');
    expect(orderItemIdsError.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(orderItemIdsError.constraints);
    expect(constraintsKeys).toHaveLength(3);
  });
});
