import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Calendar } from './calendar.entity';

@Entity()
export class CalendarUser {
  @PrimaryColumn()
  calendarId: number;

  @PrimaryColumn()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Calendar, (calendar) => calendar.calendarUsers, {
    createForeignKeyConstraints: false,
    orphanedRowAction: 'delete',
  })
  calendar: Calendar;

  @ManyToOne(() => User, (user) => user.calendarUsers, {
    createForeignKeyConstraints: false,
  })
  user: User;

  static of(calendarId: number, userId: number) {
    const calendarUser = new CalendarUser();
    calendarUser.calendarId = calendarId;
    calendarUser.userId = userId;
    return calendarUser;
  }
}
