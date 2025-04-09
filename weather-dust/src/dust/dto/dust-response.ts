import { Exclude, Expose } from 'class-transformer';

export class DustResponse {
  @Exclude() private readonly _time: string;
  @Exclude() private readonly _districtName: string;
  @Exclude() private readonly _pm10: number;
  @Exclude() private readonly _pm10Status;
  @Exclude() private readonly _pm25: number;
  @Exclude() private readonly _pm25Status;

  constructor(time: string, districtName: string, pm10: number, pm25: number) {
    this._time = time;
    this._districtName = districtName;
    this._pm10 = pm10;
    this._pm25 = pm25;
  }

  @Expose()
  get time(): string {
    return this._time;
  }

  @Expose() get districtName(): string {
    return this._districtName;
  }

  @Expose() get pm10(): number {
    return this._pm10;
  }

  @Expose() get pm10Status() {
    return;
  }

  @Expose() get pm25(): number {
    return this._pm25;
  }

  @Expose() get pm25Status() {
    return;
  }
}
