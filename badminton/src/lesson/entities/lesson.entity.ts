import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coach } from '../../coach/entities/coach.entity';
import { LessonType } from '../enums/lesson-type.enum';
import { LessonTime } from './lesson-time.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coachId: number;

  @Column({ type: 'enum', enum: LessonType })
  type: LessonType;

  @Column()
  lessonMinute: number;

  @Column({ length: 18 })
  customerName: string;

  @Column({ length: 11 })
  customerPhone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Coach, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'coachId', referencedColumnName: 'id' })
  coach: Coach;

  @OneToMany(() => LessonTime, (lessonTime) => lessonTime.lesson, {
    cascade: true,
  })
  lessonTimes: LessonTime[];

  static of(
    type: LessonType,
    coachId: number,
    lessonMinute: number,
    customerName: string,
    customerPhone: string,
  ) {
    const lesson = new Lesson();
    lesson.type = type;
    lesson.lessonMinute = lessonMinute;
    lesson.customerName = customerName;
    lesson.customerPhone = customerPhone;

    lesson.coach = new Coach();
    lesson.coach.id = coachId;
    return lesson;
  }

  isOneTimeLesson() {
    return this.type === LessonType.ONE_TIME;
  }

  isRegularLesson() {
    return this.type === LessonType.REGULAR;
  }

  updateLessonTimes(lessonTimes: LessonTime[]) {
    this.lessonTimes = lessonTimes;
    for (const lessonTime of this.lessonTimes) {
      lessonTime.updateLesson(this);
    }
  }

  updatePassword(password: string) {
    this.password = password;
  }

  validateLessonTimes() {
    const requiredLessonCount = 1;
    if (this.isOneTimeLesson()) {
      if (this.lessonTimes.length !== requiredLessonCount) {
        throw new Error('1회성 레슨의 예약 횟수가 잘못되었습니다.');
      }
    }

    const requiredRegularLessonMaxCount = 3;
    if (this.isRegularLesson()) {
      if (this.lessonTimes.length > requiredRegularLessonMaxCount) {
        throw new Error('정규 레슨의 예약 횟수가 잘못되었습니다.');
      }
    }

    for (const lessonTime of this.lessonTimes) {
      lessonTime.validate();
    }
  }

  validateCredentials(phone: string, password: string) {
    if (phone !== this.customerPhone || password !== this.password) {
      throw new Error('id나 패스워드가 일치하지 않습니다.');
    }
  }
}
