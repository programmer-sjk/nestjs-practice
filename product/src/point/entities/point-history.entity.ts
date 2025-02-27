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

  @CreateDateColumn()
  createdAt: Date;
}
