import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { LessonType } from '../enums/lesson-type.enum';

export class LessonTimesRequest {
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsInt()
  coachId: number;

  @IsNotEmpty()
  @IsEnum(LessonType)
  lessonType: LessonType;
}
