import { OrdersRequest } from '../../../src/order/dto/orders-request';

export class TestOrdersRequest {
  private constructor() {}

  static of(customerId: number) {
    const dto = new OrdersRequest();
    dto.customerId = customerId;
    return dto;
  }
}
