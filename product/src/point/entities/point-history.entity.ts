import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PointType } from '../enums/point-type.enum';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  value: number;

  @Column()
  type: PointType;

  @Column({ nullable: true })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  static of(userId: number, value: number, type: PointType) {
    const history = new PointHistory();
    history.userId = userId;
    history.value = value;
    history.type = type;

    return history;
  }
}
