import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { LessonType } from '../enums/lesson-type.enum';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('coachId')
  @Column()
  coachId: number;

  @Index('userId')
  @Column()
  userId: number;

  @Column({ type: 'enum', enum: LessonType })
  type: LessonType;

  @Column({ type: 'enum', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;

  @Column()
  startHour: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  private readonly FIRST_LESSON_HOUR = 7;
  private readonly LAST_LESSON_HOUR = 22;

  static of(
    coachId: number,
    userId: number,
    type: LessonType,
    dayOfWeek: DayOfWeek,
    startHour: number,
  ) {
    const lesson = new Lesson();
    lesson.coachId = coachId;
    lesson.userId = userId;
    lesson.type = type;
    lesson.dayOfWeek = dayOfWeek;
    lesson.startHour = startHour;
    return lesson;
  }

  isInvalidLessonHour() {
    if (
      this.startHour < this.FIRST_LESSON_HOUR &&
      this.startHour > this.LAST_LESSON_HOUR
    ) {
      return true;
    }

    return false;
  }
}
