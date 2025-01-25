import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { LessonType } from '../enums/lesson-type.enum';

export class RegisterRequest {
  @IsNotEmpty()
  @IsInt()
  coachId: number;

  @IsNotEmpty()
  @IsEnum(LessonType)
  type: LessonType;

  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsNotEmpty()
  @Min(7)
  @Max(22)
  @IsInt()
  startHour: number;
}
