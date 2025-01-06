import { Snowflake } from 'nodejs-snowflake';
import { Url } from './url';

export class SnowFlake extends Url {
  private readonly snowFlake: Snowflake;

  constructor() {
    super();

    this.snowFlake = new Snowflake();
  }

  createUrl(): string {
    const uniqueId = this.snowFlake.getUniqueID();
    return `${this.DOMAIN}/${Number(uniqueId)}`;
  }
}
