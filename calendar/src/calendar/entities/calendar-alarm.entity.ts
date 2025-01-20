import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlarmType } from '../enums/alarm-type.enum';
import { Calendar } from './calendar.entity';

@Entity()
export class CalendarAlarm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AlarmType })
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
  @JoinColumn()
  calendar: Calendar;

  static of(calendarId: number, type: AlarmType, ringMinuteBefore: number) {
    const alarm = new CalendarAlarm();
    alarm.calendarId = calendarId;
    alarm.type = type;
    alarm.ringMinuteBefore = ringMinuteBefore;
    return alarm;
  }

  update(type: AlarmType, ringMinuteBefore: number) {
    this.type = type;
    this.ringMinuteBefore = ringMinuteBefore;
  }
}
