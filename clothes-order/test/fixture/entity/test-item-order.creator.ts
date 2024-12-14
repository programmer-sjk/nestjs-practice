import { OrderItem } from '../../../src/order/entities/order-item.entity';
import { OrderItemStatus } from '../../../src/order/enum/order-item-status.enum';
import { OrderItemType } from '../../../src/order/enum/order-item-type.enum';

export class TestOrderItemCreator {
  private constructor() {}

  static of() {
    const item = new OrderItem();
    item.status = OrderItemStatus.STORED;
    item.type = OrderItemType.PRODUCT;
    item.category = 'TOP';
    item.subCategory = 'JEAN';
    item.count = 1;

    return item;
  }
}
