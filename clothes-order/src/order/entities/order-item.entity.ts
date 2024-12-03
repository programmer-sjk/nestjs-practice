import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemStatus } from '../enum/order-item-status.enum';
import { OrderItemType } from '../enum/order-item-type.enum';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  status: OrderItemStatus;

  @Column({ length: 16 })
  type: OrderItemType;

  @Column({ length: 16 })
  category: string;

  @Column({ length: 16 })
  subCategory: string;

  @Column()
  count: number;

  @Column({ nullable: true })
  requestedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  static of(
    order: Order,
    type: OrderItemType,
    category: string,
    subCategory: string,
    count: number,
  ) {
    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.status = OrderItemStatus.IN_PROGRESS;
    orderItem.type = type;
    orderItem.category = category;
    orderItem.subCategory = subCategory;
    orderItem.count = count;

    return orderItem;
  }
}
