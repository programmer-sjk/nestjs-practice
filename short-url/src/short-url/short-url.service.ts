import { Injectable, NotFoundException } from '@nestjs/common';
import { Base62Converter } from '../common/base-62-converter';
import { UrlFactory } from './classes/url-factory';
import { ShortUrl } from './entities/short-url.entity';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlRepository } from './short-url.repository';

@Injectable()
export class ShortUrlService {
  private readonly DOMAIN = 'https://short.com';

  constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

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

    const shortUrl = UrlFactory.of(type).createUrl(longUrl);
    await this.shortUrlRepository.save(ShortUrl.of(longUrl, shortUrl));
    return shortUrl;
  }

  // 트랜잭션이 걸려있다고 가정
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
