import { OrderItemDto } from '../../../src/order/dto/order-item-dto';
import { OrderItemType } from '../../../src/order/enum/order-item-type.enum';

export class TestOrderItemDto {
  private constructor() {}

  static of() {
    const dto = new OrderItemDto();
    dto.type = OrderItemType.CLOTHES;
    dto.category = 'TOP';
    dto.subCategory = 'SWEATER';
    dto.count = 3;
    return dto;
  }
}
