import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CalendarAlarm } from './calendar-alarm.entity';
import { CalendarUser } from './calendar-user.entity';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => CalendarAlarm, (alarm) => alarm.calendar, {
    cascade: true,
  })
  calendarAlarm: CalendarAlarm;

  @OneToMany(() => CalendarUser, (calendarUser) => calendarUser.calendar, {
    cascade: true,
  })
  calendarUsers: CalendarUser[];

  static of(title: string, startDate: Date, endDate: Date) {
    const calendar = new Calendar();
    calendar.title = title;
    calendar.startDate = startDate;
    calendar.endDate = endDate;
    return calendar;
  }

  update(
    title: string,
    startDate: Date,
    endDate: Date,
    calendarUsers: CalendarUser[],
    calendarAlarm: CalendarAlarm,
  ) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.calendarUsers = calendarUsers;
    this.calendarAlarm = calendarAlarm;
  }

  updateCalendarUsers(calendarUsers: CalendarUser[]) {
    this.calendarUsers = calendarUsers;
  }

  updateCalendarAlarm(calendarAlarm: CalendarAlarm) {
    this.calendarAlarm = calendarAlarm;
  }
}
