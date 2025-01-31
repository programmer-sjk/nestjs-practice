import { DateTime } from 'luxon';

export class DateUtil {
  private constructor() {}

  static now() {
    return DateTime.now();
  }

  static weekday(day: number) {
    return DateTime.now().plus({ day }).weekday;
  }

  static hour(date: Date) {
    return DateTime.fromJSDate(date).hour;
  }

  static diff(date: Date) {
    const now = DateUtil.now().startOf('day');
    return DateTime.fromJSDate(date).diff(now, 'day');
  }

  static isToday(date: Date) {
    return DateTime.fromJSDate(date).hasSame(DateUtil.now(), 'day');
  }
}
