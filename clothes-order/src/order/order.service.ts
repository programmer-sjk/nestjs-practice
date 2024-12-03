import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { In } from 'typeorm';
import { DayUtil } from '../common/day-util';
import { CustomerRepository } from './../customer/customer.repository';
import { AddOrderRequest } from './dto/add-order-request';
import { OrderResponse } from './dto/order-response';
import { ReturnOrderRequest } from './dto/return-order-request';
import { Price } from './entities/price';
import { OrderStatus } from './enum/order-status.enum';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async findOrders(userId: number) {
    const orders = await this.orderRepository.find({
      where: { customerId: userId, status: OrderStatus.IN_PROGRESS },
      relations: ['orderItems'],
    });

    return orders.map((order) => new OrderResponse(order));
  }

  async addOrder(userId: number, request: AddOrderRequest) {
    const customer = await this.customerRepository.findOneByOrFail({
      id: userId,
    });
    const order = request.toEntity(customer);
    order.updatePrice(Price.of(order.itemCount(), customer.isNewMember()));

    await this.orderRepository.save(order);
  }

  async returnClothes(userId: number, request: ReturnOrderRequest) {
    const itemIds = request.orderItemIds;
    const orders = await this.orderRepository.findWithItems(userId, itemIds);

    const orderItems = orders.flatMap((order) => order.orderItems);
    if (orderItems.length !== itemIds.length) {
      throw new InternalServerErrorException(
        '반환하는 주문 정보가 맞지 않습니다.',
      );
    }

    await this.orderItemRepository.update(
      { id: In(itemIds) },
      { requestedAt: DayUtil.toDate() },
    );
  }
}
