import { Exclude, Expose } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import { CalendarUserDto } from './calendar-user.dto';

export class CalendarsResponse {
  @Exclude()
  _id: number;

  @Exclude()
  _title: string;

  @Exclude()
  _startDate: Date;

  @Exclude()
  _endDate: Date;

  @Exclude()
  _users: CalendarUserDto[];

  constructor(
    id: number,
    title: string,
    startDate: Date,
    endDate: Date,
    users: User[],
  ) {
    this._id = id;
    this._title = title;
    this._startDate = startDate;
    this._endDate = endDate;
    this._users = users.map((user) => new CalendarUserDto(user.id, user.name));
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get startDate() {
    return this._startDate;
  }

  @Expose()
  get endDate() {
    return this._endDate;
  }

  @Expose()
  get users() {
    return this._users;
  }
}
