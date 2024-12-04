import { OrderItemStatus } from '../../../src/order/enum/order-item-status.enum';
import { OrderItemType } from '../../../src/order/enum/order-item-type.enum';
import { OrderItem } from '../../../src/order/entities/order-item.entity';

export class TestOrderItemCreator {
  private constructor() {}

  static of() {
    const item = new OrderItem();
    item.status = OrderItemStatus.STORED;
    item.type = OrderItemType.CLOTHES;
    item.category = 'TOP';
    item.subCategory = 'JEAN';
    item.count = 1;

    return item;
  }
}
