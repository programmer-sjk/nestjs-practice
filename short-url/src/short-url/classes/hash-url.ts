import { hash } from '../../common/hash';
import { Url } from './url';

export class HashUrl extends Url {
  private readonly URL_LENGTH = 7;

  createUrl(longUrl: string): string {
    return `${this.DOMAIN}/${hash(longUrl).slice(0, this.URL_LENGTH)}`;
  }
}
