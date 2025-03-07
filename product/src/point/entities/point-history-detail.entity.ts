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

  @Column({ comment: '포인트 적립/사용시 detail 원본 ID' })
  pointHistoryDetailId: number;

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
}
