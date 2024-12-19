import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { hash } from './../common/hash';
import { ShortUrl } from './entities/short-url.entity';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlRepository } from './short-url.repository';

@Injectable()
export class ShortUrlService {
  private readonly SHORT_URL_LENGTH = 7;
  private readonly MAX_HASH_COLLISION = 3;

  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

  async addShortUrl(type: CreateType, longUrl: string) {
    switch (type) {
      case CreateType.HASH:
        const retryCnt = 0;
        return this.shortUrlByHash(longUrl, retryCnt);
      case CreateType.RAW:
        return this.shortUrlByBaseCalculation(longUrl);
      case CreateType.LIB:
        return this.shortUrlByBase62(longUrl);
      default:
        throw new BadRequestException('허용하지 않는 생성 타입입니다.');
    }
  }

  private async shortUrlByHash(longUrl: string, retryCnt: number) {
    if (retryCnt >= this.MAX_HASH_COLLISION) {
      throw new InternalServerErrorException('에러가 발생했습니다.');
    }

    const newShortUrl = hash(longUrl).slice(0, this.SHORT_URL_LENGTH);
    const shortUrl = await this.shortUrlRepository.findOneBy({
      url: newShortUrl,
    });

    if (shortUrl) {
      await this.shortUrlByHash(longUrl, retryCnt++);
    }

    await this.shortUrlRepository.save(ShortUrl.of(longUrl, newShortUrl));
  }

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
