import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateUtil } from '../../common/date-util';
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

  @Column({ nullable: true })
  startHour: number;

  @Column({ nullable: true })
  startDate: Date;

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
    startHour?: number,
    startDate?: Date,
  ) {
    const lesson = new Lesson();
    lesson.coachId = coachId;
    lesson.userId = userId;
    lesson.type = type;
    lesson.dayOfWeek = dayOfWeek;
    lesson.startHour = startHour;
    lesson.startDate = startDate;
    return lesson;
  }

  isInvalidLessonHour() {
    const startHour = this.getHour();

    if (
      startHour < this.FIRST_LESSON_HOUR &&
      startHour > this.LAST_LESSON_HOUR
    ) {
      return true;
    }

    return false;
  }

  isInvalidLessonDate() {
    if (!this.startDate) {
      return false;
    }

    const diffDay = DateUtil.diff(this.startDate).days;
    if (diffDay < 1 || diffDay >= 7) {
      return true;
    }

    return false;
  }

  isDuplicate(lessons: Lesson[]) {
    for (const lesson of lessons) {
      if (this.isDuplicateHour(lesson)) {
        return true;
      }
    }
  }

  isDuplicateHour(lesson: Lesson) {
    const startHour = this.getHour();
    if (lesson.type === LessonType.REGULAR) {
      if (startHour === lesson.startHour) {
        return true;
      }
    }

    if (lesson.type === LessonType.ONE_TIME) {
      if (startHour === DateUtil.hour(this.startDate)) {
        return true;
      }
    }
  }

  getHour() {
    return this.startHour || DateUtil.hour(this.startDate);
  }
}
