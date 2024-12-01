import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './../customer/customer.repository';
import { AddClothesOrderRequest } from './dto/add-clothes-order-request';
import { Price } from './entities/price';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async addOrder(request: AddClothesOrderRequest) {
    // 원래 세션에서 userId를 가져와야 하지만 로그인 기능이 없으므로 상수로 대체
    const customer = await this.customerRepository.findOneBy({ id: 1 });
    const order = request.toEntity(customer);
    order.updatePrice(Price.of(order.itemCount(), customer.isNewMember()));

    await this.orderRepository.save(order);
  }
}
