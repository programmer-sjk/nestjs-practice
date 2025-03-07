import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  historyId: number;

  @CreateDateColumn()
  createdAt: Date;
}
