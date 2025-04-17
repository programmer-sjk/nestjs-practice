import { Exclude, Expose } from 'class-transformer';

export class PaginationResponse<T> {
  @Exclude() private _limit: number;
  @Exclude() private _currentPage: number;
  @Exclude() private _totalCount: number;
  @Exclude() private _totalPage: number;
  @Exclude() private _data: T;

  constructor(
    limit: number,
    currentPage: number,
    totalCount: number,
    totalPage: number,
    data: T,
  ) {
    this._limit = limit;
    this._currentPage = currentPage;
    this._totalCount = totalCount;
    this._totalPage = totalPage;
    this._data = data;
  }

  @Expose()
  get limit() {
    return this._limit;
  }

  @Expose()
  get curentPage() {
    return this._currentPage;
  }

  @Expose()
  get totalCount() {
    return this._totalCount;
  }

  @Expose()
  get totalPage() {
    return this._totalPage;
  }

  @Expose()
  get data() {
    return this._data;
  }
}
