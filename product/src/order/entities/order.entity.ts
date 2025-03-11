import { BadRequestException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column()
  originalPrice: number;

  @Column()
  price: number;

  @Column({ default: 0 })
  usedPoint: number;

  @Column({ nullable: true })
  couponId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  static newOrder(
    user: User,
    originalPrice: number,
    price: number,
    point?: number,
    couponId?: number,
  ) {
    const order = new Order();
    order.userId = user.id;
    order.status = OrderStatus.IN_PROGRESS;
    order.user = user;
    order.originalPrice = originalPrice;
    order.price = price;

    if (point) {
      order.usedPoint = point;
    }

    if (couponId) {
      order.couponId = couponId;
    }

    return order;
  }

  refund() {
    if (this.status === OrderStatus.REFUNDED) {
      throw new BadRequestException('이미 환불된 주문 정보입니다.');
    }

    this.status = OrderStatus.REFUNDED;
  }
}
