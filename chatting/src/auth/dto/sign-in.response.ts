import { Exclude, Expose } from 'class-transformer';

export class SignInResponse {
  @Exclude()
  _accessToken: string;

  constructor(accessToken: string) {
    this._accessToken = accessToken;
  }

  @Expose()
  get accessToken() {
    return this._accessToken;
  }
}
