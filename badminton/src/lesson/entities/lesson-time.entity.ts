import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayUtil } from '../../common/day-util';
import { DayOfWeek } from '../enums/day-of-week.enum';
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
  })
  lesson: Lesson;

  static readonly START_HOUR = 7;
  static readonly END_HOUR = 23;
  static readonly LESSON_MINUTE = 60;

  static of(
    lesson: Lesson,
    dayOfWeek?: DayOfWeek,
    startDate?: Date,
    startTime?: string,
  ) {
    const lessonTime = new LessonTime();
    lessonTime.dayOfWeek = dayOfWeek;
    lessonTime.startDate = startDate;
    lessonTime.startTime = startTime;
    lessonTime.lesson = lesson;
    return lessonTime;
  }

  validate() {
    const startDate = this.getStartDate();
    if (DayUtil.isToday(startDate)) {
      throw new Error('당일 레슨 예약은 불가능합니다.');
    }

    const startHour = DayUtil.getHour(startDate);

    const endDate = this.getEndDate();
    const endHour = DayUtil.getHour(endDate);
    const endMinute = DayUtil.getMinute(endDate);

    if (
      startHour < LessonTime.START_HOUR ||
      (endHour >= LessonTime.END_HOUR && endMinute > 0)
    ) {
      throw new Error('레슨 시간은 아침 7시부터 저녁 11시까지 입니다.');
    }
  }

  getStartDate() {
    if (this.lesson.isOneTimeLesson()) {
      return DayUtil.toDate(this.startDate);
    }

    if (this.lesson.isRegularLesson()) {
      return this.getStartDay().toDate();
    }
  }

  getEndDate() {
    if (this.lesson.isOneTimeLesson()) {
      return DayUtil.addMinute(
        this.startDate,
        LessonTime.LESSON_MINUTE,
      ).toDate();
    }

    if (this.lesson.isRegularLesson()) {
      return DayUtil.addMinute(
        this.getStartDay(),
        LessonTime.LESSON_MINUTE,
      ).toDate();
    }
  }

  updateLesson(lesson: Lesson) {
    this.lesson = lesson;
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
