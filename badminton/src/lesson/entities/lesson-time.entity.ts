import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { Lesson } from './lesson.entity';

@Entity()
export class LessonTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DayOfWeek, nullable: true })
  dayOfWeek?: DayOfWeek;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true, length: 5 })
  startTime?: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonTimes, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  lesson: Lesson;

  static readonly START_HOUR = 7;
  static readonly END_HOUR = 23;
}
