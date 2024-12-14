import { OrderType } from '../../../src/order/enum/order-type.enum';
import { AddOrderRequest } from './../../../src/order/dto/add-order-request';
import { OrderItemDto } from './../../../src/order/dto/order-item-dto';

export class TestAddOrderRequest {
  private constructor() {}

  static of(customerId: number, orderItemDtos: OrderItemDto[]) {
    const dto = new AddOrderRequest();
    dto.customerId = customerId;
    dto.type = OrderType.PRODUCT_KEEPING;
    dto.orderItemDtos = orderItemDtos;
    return dto;
  }
}
