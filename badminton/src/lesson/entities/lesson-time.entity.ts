import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { Lesson } from './lesson.entity';

@Entity()
export class LessonTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: DayOfWeek, nullable: true })
  dayOfWeek?: DayOfWeek;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  startTime?: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonTimes)
  lesson: Lesson;
}
