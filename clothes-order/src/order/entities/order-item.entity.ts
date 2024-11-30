import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  subCategory: string;

  @Column()
  count: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  static of(
    order: Order,
    type: string,
    category: string,
    subCategory: string,
    count: number,
  ) {
    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.type = type;
    orderItem.category = category;
    orderItem.subCategory = subCategory;
    orderItem.count = count;

    return orderItem;
  }
}
