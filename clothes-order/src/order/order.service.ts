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
  private readonly DEFAULT_PRICE = 1_000;

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

  async addOrder(request: AddOrderRequest) {
    const customer = await this.customerRepository.findOneByOrFail({
      id: request.customerId,
    });
    const order = request.toEntity(customer);
    order.updatePrice(
      Price.of(order.itemCount() * this.DEFAULT_PRICE, customer.isNewMember()),
    );

    await this.orderRepository.save(order);
  }

  async returnClothes(request: ReturnOrderRequest) {
    const itemIds = request.orderItemIds;
    const orders = await this.orderRepository.findWithItems(
      request.customerId,
      itemIds,
    );

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

  async remove(id: number) {
    await this.orderRepository.delete(id);
  }
}
