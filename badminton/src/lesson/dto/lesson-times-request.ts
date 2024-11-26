import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { LessonType } from '../enums/lesson-type.enum';

export class LessonTimesRequest {
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsInt()
  private coachId: number;

  @IsNotEmpty()
  @IsEnum(LessonType)
  private lessonType: LessonType;

  @IsNotEmpty()
  @IsDateString()
  private lessonStartDate: Date;
}
