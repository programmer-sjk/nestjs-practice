import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Snowflake } from 'nodejs-snowflake';
import { Base62Converter } from '../common/base-62-converter';
import { HashUrl } from './classes/hash-url';
import { SnowFlake } from './classes/snow-flake';
import { ShortUrl } from './entities/short-url.entity';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlRepository } from './short-url.repository';

@Injectable()
export class ShortUrlService {
  private readonly URL_LENGTH = 7;
  private readonly DOMAIN = 'https://short.com';
  private readonly SNOW_FLAKE: Snowflake;

  constructor(private readonly shortUrlRepository: ShortUrlRepository) {
    this.SNOW_FLAKE = new Snowflake();
  }

  async getOriginalUrl(shortUrl: string) {
    const url = await this.shortUrlRepository.findOneBy({
      url: shortUrl,
    });

    if (!url) {
      throw new NotFoundException('url 정보가 없습니다.');
    }

    return url.original;
  }

  async addShortUrl(type: CreateType, longUrl: string) {
    const existShortUrl = await this.shortUrlRepository.findOneBy({
      original: longUrl,
    });

    if (existShortUrl) {
      return existShortUrl.url;
    }

    // base 62 계산은 DB id가 필요하기에 로직이 완전 달라서 구분
    if (type === CreateType.BASE62) {
      return this.shortUrlByBaseCalculation(longUrl);
    }

    const urlGenerator = this.getShortUrlGenerator(type);
    const shortUrl = urlGenerator.createUrl(longUrl);
    await this.shortUrlRepository.save(ShortUrl.of(longUrl, shortUrl));
    return shortUrl;
  }

  private getShortUrlGenerator(type: CreateType) {
    switch (type) {
      case CreateType.HASH:
        return new HashUrl();
      case CreateType.SNOW_FLAKE:
        return new SnowFlake();
      default:
        throw new BadRequestException('허용하지 않는 생성 타입입니다.');
    }
  }

  private async shortUrlByBaseCalculation(longUrl: string) {
    const emptyShortUrl = '';
    const shortUrl = await this.shortUrlRepository.save(
      ShortUrl.of(longUrl, emptyShortUrl),
    );

    const url = `${this.DOMAIN}/${Base62Converter.encode(shortUrl.id)}`;
    shortUrl.updateShortUrl(url);
    await this.shortUrlRepository.save(shortUrl);

    return shortUrl.url;
  }
}
