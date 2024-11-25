import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coach } from '../../coach/entities/coach.entity';
import { LessonType } from '../enums/lesson-type.enum';
import { LessonTime } from './lesson-time.entity';

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

  @ManyToOne(() => Coach, { createForeignKeyConstraints: false, cascade: true })
  @JoinColumn({ name: 'coachId', referencedColumnName: 'id' })
  coach: Coach;

  @OneToMany(() => LessonTime, (lessonTime) => lessonTime.lesson)
  lessonTimes: LessonTime[];
}
