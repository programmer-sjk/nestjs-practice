import { Exclude, Expose } from 'class-transformer';

export class PaginationResponse<T> {
  @Exclude() readonly _currentPage: number;
  @Exclude() readonly _totalPage: number;
  @Exclude() readonly _totalCount: number;
  @Exclude() readonly _limit: number;
  @Exclude() readonly _data: T[];

  constructor(limit: number, totalCount: number, offset: number, data: T[]) {
    this._limit = limit;
    this._totalCount = totalCount;
    this._currentPage = offset;
    this._totalPage = Math.ceil(totalCount / limit);
    this._data = data;
  }

  @Expose()
  get currentPage(): number {
    return this._currentPage;
  }

  @Expose()
  get totalPage(): number {
    return this._totalPage;
  }

  @Expose()
  get totalCount(): number {
    return this._totalCount;
  }

  @Expose()
  get limit(): number {
    return this._limit;
  }

  @Expose()
  get data(): T[] {
    return this._data;
  }
}
