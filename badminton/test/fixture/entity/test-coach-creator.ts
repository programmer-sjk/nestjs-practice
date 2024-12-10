import { Coach } from './../../../src/coach/entities/coach.entity';

export class TestCoachCreator {
  private constructor() {}

  static of() {
    const coach = new Coach();
    coach.name = '조자룡';

    return coach;
  }
}
