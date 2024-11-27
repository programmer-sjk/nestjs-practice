import { Exclude, Expose } from 'class-transformer';

export class AddLessonResponse {
  @Exclude()
  private readonly _id: string;

  @Exclude()
  private readonly _pasword: string;

  constructor(id: string, password: string) {
    this._id = id;
    this._pasword = password;
  }

  @Expose()
  get id(): string {
    return this._id;
  }

  @Expose()
  get password(): string {
    return this._pasword;
  }
}
