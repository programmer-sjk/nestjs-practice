import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

import * as isBetween from 'dayjs/plugin/isBetween';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DayOfWeek } from '../lesson/enums/day-of-week.enum';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

export class DayUtil {
  private constructor() {}

  static now() {
    return dayjs();
  }

  static of(target: Date | Dayjs, hour?: number, minute?: number) {
    return dayjs(target)
      .startOf('day')
      .hour(hour ?? 0)
      .minute(minute ?? 0);
  }

  static getDay(dayOfWeek?: DayOfWeek) {
    if (!dayOfWeek) {
      return DayUtil.now().day();
    }

    switch (dayOfWeek) {
      case DayOfWeek.SUNDAY:
        return 0;
      case DayOfWeek.MONDAY:
        return 1;
      case DayOfWeek.TUESDAY:
        return 2;
      case DayOfWeek.WEDNESDAY:
        return 3;
      case DayOfWeek.THURSDAY:
        return 4;
      case DayOfWeek.FIRDAY:
        return 5;
      case DayOfWeek.SATURDAY:
        return 6;
    }
  }

  static getHour(target: Date) {
    return dayjs(target).hour();
  }

  static getMinute(target: Date) {
    return dayjs(target).minute();
  }

  static isToday(target: Date) {
    const now = DayUtil.now();
    return now.format('YYYY-MM-DD') === dayjs(target).format('YYYY-MM-DD');
  }

  static add(target: Dayjs, day: number, hour?: number) {
    return target
      .startOf('day')
      .add(day, 'day')
      .hour(hour ?? 0);
  }

  static addFromNow(day: number, hour?: number) {
    return dayjs()
      .startOf('day')
      .add(day, 'day')
      .hour(hour ?? 0);
  }

  static addMinute(target: Date | Dayjs, minute: number) {
    return dayjs(target).add(minute, 'minute');
  }

  static isSameOrBefore(date: Dayjs, end: Dayjs) {
    return date.isSameOrBefore(end);
  }

  static toDate(target: Date) {
    return dayjs(target).toDate();
  }
}
