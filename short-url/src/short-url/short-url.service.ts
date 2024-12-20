import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Snowflake } from 'nodejs-snowflake';
import { Base62Converter } from '../common/base-62-converter';
import { hash } from './../common/hash';
import { ShortUrl } from './entities/short-url.entity';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlRepository } from './short-url.repository';

@Injectable()
export class ShortUrlService {
  private readonly DEFAULT_SHORT_URL_LENGTH = 7;
  private readonly MAX_HASH_COLLISION = 3;
  private readonly DOMAIN = 'https://short.com';
  private readonly SNOW_FLAKE: Snowflake;

  constructor(private readonly shortUrlRepository: ShortUrlRepository) {
    this.SNOW_FLAKE = new Snowflake();
  }

  async addShortUrl(type: CreateType, longUrl: string) {
    const existUrl = await this.getShortUrlByOriginal(longUrl);
    if (existUrl) {
      return existUrl.url;
    }

    switch (type) {
      case CreateType.HASH:
        return this.shortUrlByHash(longUrl);
      case CreateType.RAW:
        return this.shortUrlByBaseCalculation(longUrl);
      case CreateType.SNOW_FLAKE:
        return this.shortUrlBySnowFlake(longUrl);
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
        return newShortUrl;
      }
    }

    throw new InternalServerErrorException('short url 생성에 실패했습니다.');
  }

  // 트랜잭션 걸었다고 가정
  private async shortUrlByBaseCalculation(longUrl: string) {
    const emptyShortUrl = '';
    const shortUrl = await this.shortUrlRepository.save(
      ShortUrl.of(longUrl, emptyShortUrl),
    );

    const url = `${this.DOMAIN}/${Base62Converter.encode(shortUrl.id)}`;
    shortUrl.updateShortUrl(url);
    await this.shortUrlRepository.save(shortUrl);
    return url;
  }

  private async shortUrlBySnowFlake(longUrl: string) {
    const uniqueId = this.SNOW_FLAKE.getUniqueID();
    const url = `${this.DOMAIN}/${Base62Converter.encode(Number(uniqueId))}`;
    await this.shortUrlRepository.save(ShortUrl.of(longUrl, url));
    return url;
  }

  private async getShortUrlByOriginal(original: string) {
    return this.shortUrlRepository.findOneBy({ original });
  }
}
