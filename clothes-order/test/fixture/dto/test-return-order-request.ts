import { ReturnOrderRequest } from './../../../src/order/dto/return-order-request';

export class TestReturnOrderRequest {
  private constructor() {}

  static of(cusotmerId: number, orderItemIds: number[]) {
    const dto = new ReturnOrderRequest();
    dto.customerId = cusotmerId;
    dto.orderItemIds = orderItemIds;
    return dto;
  }
}
