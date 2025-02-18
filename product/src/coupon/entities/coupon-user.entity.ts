import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CouponUser {
  @PrimaryColumn()
  couponId: number;

  @PrimaryColumn()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  static of(couponId: number, userId: number) {
    const couponUser = new CouponUser();
    couponUser.couponId = couponId;
    couponUser.userId = userId;
    return couponUser;
  }
}
