import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PointHistory } from './point-history.entity';

@Entity()
export class PointHistoryDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('userId')
  @Column()
  userId: number;

  @Column()
  value: number;

  @Column()
  pointHistoryDetailId: number;

  @Column()
  pointhistoryId: number;

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
