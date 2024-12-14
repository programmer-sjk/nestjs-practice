import { Order } from '../../../src/order/entities/order.entity';
import { Price } from '../../../src/order/entities/price';
import { OrderItem } from './../../../src/order/entities/order-item.entity';

describe('Order', () => {
  it('주문은 주문 상세(orderItems)를 업데이트 할 수 있다.', () => {
    // given
    const order = new Order();
    const orderItem = new OrderItem();
    orderItem.id = 1;

    // when
    order.updateOrderItems([orderItem]);

    // then
    expect(order.orderItems[0]).toEqual(orderItem);
    expect(order.orderItems[0].id).toBe(orderItem.id);
  });

  it('가격을 업데이트 할 수 있다.', () => {
    // given
    const order = new Order();
    const price = Price.of(1_000);

    // when
    order.updatePrice(price);

    // then
    expect(order.price).toBe(1_000);
  });

  it('주문 상세의 개수를 알 수 있다.', () => {
    // given
    const order = new Order();
    const orderItem = new OrderItem();
    orderItem.count = 1;
    order.orderItems = [orderItem];

    // when
    const result = order.itemCount();

    // then
    expect(result).toBe(1);
  });
});
