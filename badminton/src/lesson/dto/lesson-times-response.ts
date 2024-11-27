import { Exclude, Expose } from 'class-transformer';

export class LessonTimesResponse {
  @Exclude()
  private _start: Date;

  @Exclude()
  private _end: Date;

  constructor(start: Date, end: Date) {
    this._start = start;
    this._end = end;
  }

  @Expose()
  get start(): Date {
    return this._start;
  }

  @Expose()
  get end(): Date {
    return this._end;
  }
}
