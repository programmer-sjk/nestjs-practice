import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
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
  @IsString()
  startTime?: string;

  constructor() {}

  toEntity(lesson: Lesson): LessonTime {
    return LessonTime.of(
      lesson,
      this.dayOfWeek,
      this.startDate,
      this.startTime,
    );
  }
}
