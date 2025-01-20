import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CalendarUser } from '../../calendar/entities/calendar-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 16 })
  mail: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CalendarUser, (calendarUser) => calendarUser.user)
  calendarUsers: CalendarUser[];

  static of(name: string, mail: string, phoneNumber: string) {
    const user = new User();
    user.name = name;
    user.mail = mail;
    user.phoneNumber = phoneNumber;
    return user;
  }
}
