import { Exclude, Expose } from 'class-transformer';

export class CalendarUserDto {
  @Exclude()
  _id: number;

  @Exclude()
  _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get name() {
    return this._name;
  }
}
