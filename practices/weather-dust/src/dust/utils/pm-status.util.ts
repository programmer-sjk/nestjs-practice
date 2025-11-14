import { PmStatus } from '../enums/pm-status.enum';

export class PmStatusUtil {
  private constructor() {}

  static of(pm: number) {
    if (pm <= 50) {
      return PmStatus.GOOD;
    } else if (pm <= 100) {
      return PmStatus.NORMAL;
    } else if (pm <= 250) {
      return PmStatus.BAD;
    } else {
      return PmStatus.WORST;
    }
  }
}
