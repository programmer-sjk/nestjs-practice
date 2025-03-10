import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PointStatus } from '../enums/point-status.enum';
import { PointType } from '../enums/point-type.enum';
import { PointHistoryDetail } from './point-history-detail.entity';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('userId')
  @Column()
  userId: number;

  @Column()
  status: PointStatus;

  @Column()
  value: number;

  @Column()
  type: PointType;

  @Column({ nullable: true })
  orderId: number;

  @Column({ nullable: true })
  memo: string;

  @Column({ nullable: true })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PointHistoryDetail, (detail) => detail.pointHistory)
  historyDetails: PointHistoryDetail[];

  private static of(
    userId: number,
    value: number,
    type: PointType,
    expiredAt?: Date,
  ) {
    const history = new PointHistory();
    history.userId = userId;
    history.value = value;
    history.type = type;
    history.expiredAt = expiredAt;

    return history;
  }

  static earn(
    userId: number,
    value: number,
    type: PointType,
    expiredAt?: Date,
  ) {
    const history = this.of(userId, value, type, expiredAt);
    history.status = PointStatus.EARN;
    return history;
  }

  static use(
    userId: number,
    value: number,
    type: PointType,
    orderId: number,
    expiredAt?: Date,
  ) {
    const history = this.of(userId, value, type, expiredAt);
    history.status = PointStatus.USE;
    history.orderId = orderId;
    return history;
  }

  static refund(
    userId: number,
    value: number,
    type: PointType,
    expiredAt?: Date,
  ) {
    const history = this.of(userId, value, type, expiredAt);
    history.status = PointStatus.REFUND;
    return history;
  }
}
