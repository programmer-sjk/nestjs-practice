import { Exclude, Expose } from 'class-transformer';

export class WeatherResponse {
  @Exclude() private readonly _summary: string;
  @Exclude() private readonly _temp: number;
  @Exclude() private readonly _feelTemp: number;

  constructor(summary: string, temp: number, feelTemp: number) {
    this._summary = summary;
    this._temp = temp;
    this._feelTemp = feelTemp;
  }

  @Expose()
  get summary(): string {
    return this._summary;
  }

  @Expose()
  get temp(): number {
    return this._temp;
  }

  @Expose()
  get feelTemp(): number {
    return Number(this._feelTemp);
  }
}
