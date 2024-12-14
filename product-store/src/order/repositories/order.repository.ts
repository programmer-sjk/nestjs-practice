import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItemStatus } from '../enum/order-item-status.enum';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  findWithItems(customerId: number, orderItemIds: number[]) {
    return this.createQueryBuilder('order')
      .innerJoinAndSelect('order.orderItems', 'orderItems')
      .where('order.customerId = :customerId', { customerId })
      .andWhere('orderItems.id IN (:...orderItemIds)', { orderItemIds })
      .andWhere('orderItems.status = :status', {
        status: OrderItemStatus.STORED,
      })
      .getMany();
  }
}
