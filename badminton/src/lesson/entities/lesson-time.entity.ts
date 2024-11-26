import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';

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
}
