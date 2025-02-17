import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CouponType } from '../enums/coupon-type.enum';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column({ type: 'enum', enum: CouponType })
  type: CouponType;

  @Column()
  value: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  static of(
    name: string,
    type: CouponType,
    value: number,
    stock: number,
    description?: string,
  ) {
    const coupon = new Coupon();
    coupon.name = name;
    coupon.type = type;
    coupon.value = value;
    coupon.stock = stock;
    coupon.description = description;
    return coupon;
  }
}
