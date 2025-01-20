import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlarmType } from '../enums/alarm-type.enum';
import { Calendar } from './calendar.entity';

@Entity()
export class CalendarAlarm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: AlarmType })
  type: AlarmType;

  @Column()
  ringMinuteBefore: number;

  @Column()
  calendarId: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Calendar, (calendar) => calendar.calendarAlarm, {
    createForeignKeyConstraints: false,
  })
  calendar: Calendar;
}
