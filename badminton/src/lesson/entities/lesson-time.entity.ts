import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { DayUtil } from './../../common/DayUtil';
import { Lesson } from './lesson.entity';

@Entity()
export class LessonTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DayOfWeek, nullable: true })
  dayOfWeek?: DayOfWeek;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true, length: 5 })
  startTime?: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonTimes, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  lesson: Lesson;

  static readonly START_HOUR = 7;
  static readonly END_HOUR = 23;

  getStartDate() {
    if (this.lesson.isOneTimeLesson()) {
      return this.startDate;
    }

    if (this.lesson.isRegularLesson()) {
      return this.getStartDay().toDate();
    }
  }

  getEndDate() {
    if (this.lesson.isOneTimeLesson()) {
      return DayUtil.addHour(this.startDate, 1).toDate();
    }

    if (this.lesson.isRegularLesson()) {
      return DayUtil.addHour(this.getStartDay(), 1).toDate();
    }
  }

  private getStartDay() {
    const [hour, minute] = this.startTime.split(':');
    const nowOfDay = DayUtil.getDay();
    const diff = DayUtil.getDay(this.dayOfWeek) - nowOfDay;

    let startDay;
    if (diff === 0) {
      startDay = DayUtil.addFromNow(7);
    } else if (diff > 0) {
      startDay = DayUtil.addFromNow(diff);
    } else {
      startDay = DayUtil.addFromNow(7 - nowOfDay);
    }

    return DayUtil.of(startDay, Number(hour), Number(minute));
  }
}
