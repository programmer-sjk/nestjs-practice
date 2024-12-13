import { Customer } from '../../../src/customer/entities/customer.entity';
import { Order } from '../../../src/order/entities/order.entity';
import { Price } from '../../../src/order/entities/price';
import { DeliveryStatus } from '../../../src/order/enum/delivery-status.enum';
import { OrderStatus } from '../../../src/order/enum/order-status.enum';

export class TestOrderCreator {
  private constructor() {}

  static of(customer?: Customer) {
    const order = new Order();
    order.price = Price.of(1_000).value();
    order.status = OrderStatus.IN_PROGRESS;
    order.deliveryStatus = DeliveryStatus.STORED;

    if (customer) {
      order.customerId = customer.id;
      order.customerZipCode = customer.zipCode;
      order.customerAddress = customer.address;
      order.customerAddressDetail = customer.addressDetail;
    }

    return order;
  }
}
