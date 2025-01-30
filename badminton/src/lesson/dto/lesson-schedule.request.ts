import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class LessonScheduleRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  coachId: number;
}
