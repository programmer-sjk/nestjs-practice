import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PointStatus } from '../enums/point-status.enum';
import { PointHistory } from './point-history.entity';

@Entity()
export class PointHistoryDetail {
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
  pointHistoryId: number;

  @Column()
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => PointHistory,
    (pointHistory) => pointHistory.historyDetails,
    {
      createForeignKeyConstraints: false,
    },
  )
  pointHistory: PointHistory;

  private static of(userId: number, value: number, pointHistoryId: number) {
    const detail = new PointHistoryDetail();
    detail.userId = userId;
    detail.value = value;
    detail.pointHistoryId = pointHistoryId;
    return detail;
  }

  static earn(userId: number, value: number, pointHistoryId: number) {
    const detail = this.of(userId, value, pointHistoryId);
    detail.status = PointStatus.EARN;
    detail.isUsed = false;
    return detail;
  }

  static use(userId: number, value: number, pointHistoryId: number) {
    const detail = this.of(userId, value, pointHistoryId);
    detail.status = PointStatus.USE;
    detail.isUsed = true;
    return detail;
  }
}
