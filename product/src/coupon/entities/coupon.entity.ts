import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CouponType } from '../enums/coupon-type.enum';
import { CouponUser } from './coupon-user.entity';

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
  categoryId: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CouponUser, (user) => user.coupon)
  couponUsers: CouponUser[]

  static of(
    name: string,
    type: CouponType,
    value: number,
    stock: number,
    categoryId?: number,
    description?: string,
  ) {
    const coupon = new Coupon();
    coupon.name = name;
    coupon.type = type;
    coupon.value = value;
    coupon.stock = stock;
    coupon.categoryId = categoryId;
    coupon.description = description;
    return coupon;
  }
}
