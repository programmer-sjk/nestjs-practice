import { BadRequestException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  couponUsers: CouponUser[];

  private static readonly INFINITE_COUPON = -1;

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

  hasStock() {
    if (this.isInfiniteCoupon()) {
      return true;
    }

    return this.stock > 0;
  }

  decreaseStock() {
    if (this.isInfiniteCoupon()) {
      return true;
    }

    if (this.stock <= 0) {
      throw new BadRequestException('쿠폰 재고가 없습니다.');
    }

    this.stock -= 1;
  }

  private isInfiniteCoupon() {
    return this.stock === Coupon.INFINITE_COUPON;
  }
}
