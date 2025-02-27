import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';

@Entity()
export class CouponUser {
  @PrimaryColumn()
  couponId: number;

  @PrimaryColumn()
  userId: number;

  @Column({ default: false })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Coupon, (coupon) => coupon.couponUsers, {
    createForeignKeyConstraints: false,
  })
  coupon: Coupon;

  static of(couponId: number, userId: number) {
    const couponUser = new CouponUser();
    couponUser.couponId = couponId;
    couponUser.userId = userId;
    return couponUser;
  }
}
