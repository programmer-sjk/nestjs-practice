import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonType } from '../enums/lesson-type.enum';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: LessonType })
  type: LessonType;

  @Column()
  lessonMinute: number;

  @Column({ length: 18 })
  customerName: string;

  @Column({ length: 11 })
  customerPhone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
