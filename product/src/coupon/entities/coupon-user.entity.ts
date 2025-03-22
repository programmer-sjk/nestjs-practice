import { BadRequestException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';

@Entity()
export class CouponUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  couponId: number;

  @Column()
  userId: number;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: true })
  expiredAt: Date;

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

  use(now: Date) {
    if (this.isUsed) {
      throw new BadRequestException('이미 사용된 쿠폰입니다.');
    }

    if (this.expiredAt && this.expiredAt < now) {
      throw new BadRequestException('유효기간이 만료된 쿠폰입니다.');
    }

    this.isUsed = true;
  }

  unuse() {
    this.isUsed = false;
  }
}
