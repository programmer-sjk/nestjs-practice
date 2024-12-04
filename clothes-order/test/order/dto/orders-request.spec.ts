import { validate } from 'class-validator';
import { OrdersRequest } from '../../../src/order/dto/orders-request';

describe('OrdersRequest', () => {
  it('customerid는 숫자형이며 필수값이다.', async () => {
    // given
    const dto = new OrdersRequest();
    dto.customerId = undefined;

    // when
    const errors = await validate(dto);

    // then
    const customerIdErrors = errors.find(
      (err) => err.property === 'customerId',
    );
    expect(customerIdErrors.constraints).toHaveProperty('isNumber');
    expect(customerIdErrors.constraints).toHaveProperty('isNotEmpty');

    const constraintsKeys = Object.keys(customerIdErrors.constraints);
    expect(constraintsKeys).toHaveLength(2);
  });
});
