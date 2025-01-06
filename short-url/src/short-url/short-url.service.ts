import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Snowflake } from 'nodejs-snowflake';
import { Base62Converter } from '../common/base-62-converter';
import { hash } from './../common/hash';
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

    const shortUrl = await this.createShortUrlByType(type, longUrl);
    await this.shortUrlRepository.save(shortUrl);
    return shortUrl.url;
  }

  private async createShortUrlByType(type: CreateType, longUrl: string) {
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
    const newUrl = `${this.DOMAIN}/${hash(longUrl).slice(0, this.URL_LENGTH)}`;
    return ShortUrl.of(longUrl, newUrl);
  }

  private async shortUrlByBaseCalculation(longUrl: string) {
    const emptyShortUrl = '';
    const shortUrl = await this.shortUrlRepository.save(
      ShortUrl.of(longUrl, emptyShortUrl),
    );

    const url = `${this.DOMAIN}/${Base62Converter.encode(shortUrl.id)}`;
    shortUrl.updateShortUrl(url);
    return shortUrl;
  }

  private async shortUrlBySnowFlake(longUrl: string) {
    const uniqueId = this.SNOW_FLAKE.getUniqueID();
    const url = `${this.DOMAIN}/${Number(uniqueId)}`;
    return ShortUrl.of(longUrl, url);
  }
}
