import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PointType } from '../enums/point-type.enum';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('userId')
  @Column()
  userId: number;

  @Column()
  value: number;

  @Column()
  type: PointType;

  @Column({ nullable: true })
  memo: string;

  @Column({ nullable: true })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  static of(userId: number, value: number, type: PointType, expiredAt?: Date) {
    const history = new PointHistory();
    history.userId = userId;
    history.value = value;
    history.type = type;
    history.expiredAt = expiredAt;

    return history;
  }
}
