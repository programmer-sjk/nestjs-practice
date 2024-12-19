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
  private readonly DEFAULT_SHORT_URL_LENGTH = 7;
  private readonly MAX_HASH_COLLISION = 3;

  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

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

  private async shortUrlByHash(longUrl: string) {
    for (let i = 0; i <= this.MAX_HASH_COLLISION; i++) {
      const urlLength = this.DEFAULT_SHORT_URL_LENGTH + i;
      const newShortUrl = hash(longUrl).slice(0, urlLength);
      const shortUrl = await this.shortUrlRepository.findOneBy({
        url: newShortUrl,
      });

      if (!shortUrl) {
        await this.shortUrlRepository.save(ShortUrl.of(longUrl, newShortUrl));
        break;
      }
    }

    throw new InternalServerErrorException('short url 생성에 실패했습니다.');
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
