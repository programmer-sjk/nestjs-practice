import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  update(title: string, startDate: Date, endDate: Date) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
