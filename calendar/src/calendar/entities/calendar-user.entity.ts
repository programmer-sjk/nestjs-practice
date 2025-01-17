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
  })
  calendar: Calendar;

  @ManyToOne(() => User, (user) => user.calendarUsers, {
    createForeignKeyConstraints: false,
  })
  user: User;
}
