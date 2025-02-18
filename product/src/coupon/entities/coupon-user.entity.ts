import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CouponUser {
  @PrimaryColumn()
  couponId: number;

  @PrimaryColumn()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
