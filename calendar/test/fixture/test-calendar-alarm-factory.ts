import { CalendarAlarm } from '../../src/calendar/entities/calendar-alarm.entity';
import { AlarmType } from '../../src/calendar/enums/alarm-type.enum';

export class TestCalendarAlarmFactory {
  private constructor() {}

  static of(calendarId: number) {
    return CalendarAlarm.of(calendarId, AlarmType.MAIL, 10);
  }
}
