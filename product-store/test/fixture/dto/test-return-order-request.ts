import { TakeOrderRequest } from '../../../src/order/dto/take-order-request';

export class TestReturnOrderRequest {
  private constructor() {}

  static of(cusotmerId: number, orderItemIds: number[]) {
    const dto = new TakeOrderRequest();
    dto.customerId = cusotmerId;
    dto.orderItemIds = orderItemIds;
    return dto;
  }
}
