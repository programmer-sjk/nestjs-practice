import { IsInt, IsNotEmpty } from 'class-validator';

export class LessonScheduleRequest {
  @IsNotEmpty()
  @IsInt()
  coachId: number;
}
