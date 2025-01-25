import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { LessonType } from '../enums/lesson-type.enum';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coachId')
  @Column()
  coachId: number;

  @Index('userId')
  @Column()
  userId: number;

  @Column({ type: 'enum', enum: LessonType })
  type: LessonType;

  @Column({ type: 'enum', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;

  @Column()
  startHour: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
