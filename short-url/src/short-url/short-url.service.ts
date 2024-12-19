import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateType } from './enums/create-type.enum';

@Injectable()
export class ShortUrlService {
  async addShortUrl(type: CreateType, longUrl: string) {
    switch (type) {
      case CreateType.HASH:
        return this.shortUrlByHash(longUrl);
      case CreateType.RAW:
        return this.shortUrlByBaseCalculation(longUrl);
      case CreateType.LIB:
        return this.shortUrlByBase62(longUrl);
      default:
        throw new BadRequestException('허용하지 않는 생성 타입입니다.');
    }
  }

  private async shortUrlByHash(longUrl: string) {}

  private async shortUrlByBaseCalculation(longUrl: string) {}

  private async shortUrlByBase62(longUrl: string) {}

  test() {
    const t = 8;
    const base = 2;

    const result = [];
    let current = t;
    while (current >= base) {
      result.push(current % base);
      current = Math.floor(current / base);
    }

    result.push(current);

    console.log(result);
  }
}
