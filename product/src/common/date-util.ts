import { DateTime } from 'luxon';

export class DateUtil {
  private constructor() {}

  static now() {
    return DateTime.now();
  }
}
