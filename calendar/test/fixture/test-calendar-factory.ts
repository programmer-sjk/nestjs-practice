import { Calendar } from './../../src/calendar/entities/calendar.entity';

export class TestCalendarFactory {
  private constructor() {}

  static of(title: string) {
    return Calendar.of(title, new Date(), new Date());
  }
}
