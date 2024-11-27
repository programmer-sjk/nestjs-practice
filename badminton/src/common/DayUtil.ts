import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

import * as isBetween from 'dayjs/plugin/isBetween';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

export class DayUtil {
  private constructor() {}

  static now() {
    return dayjs();
  }

  static of(target: Date | Dayjs, hour?: number) {
    return dayjs(target)
      .startOf('day')
      .hour(hour ?? 0);
  }

  static add(target: Dayjs, day: number, hour?: number) {
    return target
      .startOf('day')
      .add(day, 'day')
      .hour(hour ?? 0);
  }

  static addFromNow(day: number) {
    return dayjs().startOf('day').add(day, 'day');
  }

  static addHour(target: Dayjs, hour: number) {
    return target.add(hour, 'hour');
  }

  static isSameOrBefore(date: Dayjs, end: Dayjs) {
    return date.isSameOrBefore(end);
  }
}
