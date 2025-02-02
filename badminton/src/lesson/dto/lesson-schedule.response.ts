import { Exclude, Expose } from 'class-transformer';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class LessonScheduleResponse {
  @Exclude()
  _schedules: Record<DayOfWeek, number[]>;

  constructor(schedules: Record<DayOfWeek, number[]>) {
    this._schedules = schedules;
  }

  @Expose()
  get schedules() {
    return this._schedules;
  }
}
