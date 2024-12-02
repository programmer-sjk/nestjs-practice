import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './../customer/customer.repository';
import { AddClothesOrderRequest } from './dto/add-clothes-order-request';
import { OrderResponse } from './dto/order-response';
import { Price } from './entities/price';
import { OrderStatus } from './enum/order-status.enum';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async findOrders(userId: number) {
    const orders = await this.orderRepository.find({
      where: { customerId: userId, status: OrderStatus.IN_PROGRESS },
      relations: ['orderItems'],
    });

    return orders.map((order) => new OrderResponse(order));
  }

  async addOrder(userId: number, request: AddClothesOrderRequest) {
    const customer = await this.customerRepository.findOneBy({ id: userId });
    const order = request.toEntity(customer);
    order.updatePrice(Price.of(order.itemCount(), customer.isNewMember()));

    await this.orderRepository.save(order);
  }
}
