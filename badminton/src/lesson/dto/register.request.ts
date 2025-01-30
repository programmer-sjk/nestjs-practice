import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { LessonType } from '../enums/lesson-type.enum';
import { Lesson } from './../entities/lesson.entity';

export class RegisterRequest {
  @IsNotEmpty()
  @IsInt()
  coachId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsEnum(LessonType)
  type: LessonType;

  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsOptional()
  @Min(7)
  @Max(22)
  @IsInt()
  startHour?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  toEntity() {
    return Lesson.of(
      this.coachId,
      this.userId,
      this.type,
      this.dayOfWeek,
      this.startHour,
      this.startDate,
    );
  }
}
