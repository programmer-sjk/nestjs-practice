import { Exclude, Expose } from 'class-transformer';
import { PointType } from '../enums/point-type.enum';

export class PointHistoryResponse {
  @Exclude() _id: number;
  @Exclude() _userId: number;
  @Exclude() _value: number;
  @Exclude() _type: PointType;
  @Exclude() _expiredAt: Date;
  @Exclude() _createdAt: Date;

  constructor(
    id: number,
    userId: number,
    value: number,
    type: PointType,
    expiredAt: Date,
    createdAt: Date,
  ) {
    this._id = id;
    this._userId = userId;
    this._value = value;
    this._type = type;
    this._expiredAt = expiredAt;
    this._createdAt = createdAt;
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get userId() {
    return this._userId;
  }
  @Expose()
  get value() {
    return this._value;
  }
  @Expose()
  get type() {
    return this._type;
  }
  @Expose()
  get expiredAt() {
    return this._expiredAt;
  }
  @Expose()
  get createdAt() {
    return this._createdAt;
  }
}
