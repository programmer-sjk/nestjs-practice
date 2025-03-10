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
  detailHistoryId: number;

  @Column()
  pointHistoryId: number;

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

  private static of(
    userId: number,
    value: number,
    pointHistoryId: number,
    detailHistoryId?: number,
  ) {
    const detail = new PointHistoryDetail();
    detail.userId = userId;
    detail.value = value;
    detail.detailHistoryId = detailHistoryId ?? pointHistoryId;
    detail.pointHistoryId = pointHistoryId;
    return detail;
  }

  static earn(userId: number, value: number, pointHistoryId: number) {
    const detail = this.of(userId, value, pointHistoryId);
    detail.status = PointStatus.EARN;
    return detail;
  }

  static use(
    userId: number,
    value: number,
    pointHistoryId: number,
    detailHistoryId: number,
  ) {
    const detail = this.of(userId, value, pointHistoryId, detailHistoryId);
    detail.status = PointStatus.USE;
    return detail;
  }
}
