import { Exclude, Expose } from 'class-transformer';

export class AddressResponse {
  @Exclude()
  private readonly _roadAddress: string;

  @Exclude()
  private readonly _jibunAddress: string;

  constructor(roadAddress: string, jibunAddress: string) {
    this._roadAddress = roadAddress;
    this._jibunAddress = jibunAddress;
  }

  @Expose()
  get roadAddress() {
    return this._roadAddress;
  }

  @Expose()
  get jibunAddress() {
    return this._jibunAddress;
  }
}
