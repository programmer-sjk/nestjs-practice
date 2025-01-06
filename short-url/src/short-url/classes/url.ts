export abstract class Url {
  protected readonly DOMAIN = 'https://short.com';

  abstract createUrl(longUrl?: string): string;
}
