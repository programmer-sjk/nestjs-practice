import * as dayjs from 'dayjs';

export class DayUtil {
  private constructor() {}

  static diff(target: Date) {
    return dayjs().diff(target, 'day');
  }
}
