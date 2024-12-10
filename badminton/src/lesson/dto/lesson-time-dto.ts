import { IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { LessonTime } from '../entities/lesson-time.entity';
import { Lesson } from '../entities/lesson.entity';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class LessonTimeDto {
  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Length(5)
  @IsString()
  startTime?: string;

  constructor() {}

  toEntity(lesson: Lesson): LessonTime {
    return LessonTime.of(
      lesson,
      this.startDate,
      this.dayOfWeek,
      this.startTime,
    );
  }
}
