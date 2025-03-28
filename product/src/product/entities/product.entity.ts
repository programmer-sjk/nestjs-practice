import { BadRequestException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../../order/entities/order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  static of(name: string, price: number, stock: number, categoryId: number) {
    const product = new Product();
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.categoryId = categoryId;
    return product;
  }

  decreaseStock() {
    if (this.stock <= 0) {
      throw new BadRequestException('재고가 없습니다.');
    }

    this.stock = this.stock - 1;
  }
}
