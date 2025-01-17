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

  @OneToMany(() => CalendarUser, (calendarUser) => calendarUser.calendar)
  calendarUsers: CalendarUser[];
}
