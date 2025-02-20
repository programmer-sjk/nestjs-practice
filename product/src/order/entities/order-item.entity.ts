import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    createForeignKeyConstraints: false,
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    createForeignKeyConstraints: false,
  })
  product: Product;

  static of(order: Order, product: Product) {
    const item = new OrderItem();
    item.orderId = order.id;
    item.order = order;

    item.productId = product.id;
    item.product = product;
    return order;
  }
}
