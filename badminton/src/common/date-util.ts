import { DateTime } from 'luxon';

export class DateUtil {
  private constructor() {}

  static now() {
    return DateTime.now();
  }

  static weekday(day: number) {
    return DateTime.now().plus({ day }).weekday;
  }
}
