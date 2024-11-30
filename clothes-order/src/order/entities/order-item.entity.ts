import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

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

  static of(
    orderId: number,
    type: string,
    category: string,
    subCategory: string,
    count: number,
  ) {
    const orderItem = new OrderItem();
    orderItem.orderId = orderId;
    orderItem.type = type;
    orderItem.category = category;
    orderItem.subCategory = subCategory;
    orderItem.count = count;

    return orderItem;
  }
}
