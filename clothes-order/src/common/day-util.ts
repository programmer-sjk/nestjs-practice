import * as dayjs from 'dayjs';

export class DayUtil {
  private constructor() {}

  static toDate(target?: Date) {
    return dayjs(target).toDate();
  }

  static diff(target: Date) {
    return dayjs().diff(target, 'day');
  }
}
