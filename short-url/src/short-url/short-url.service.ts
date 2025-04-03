import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { hash } from '../common/hash';
import { UrlFactory } from './classes/url-factory';
import { ShortUrl } from './entities/short-url.entity';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlRepository } from './short-url.repository';

@Injectable()
export class ShortUrlService {
  private readonly DOMAIN = 'https://short.com';
  private readonly PADDING_VALUE = '-';
  private readonly URL_LENGTH = 7;
  private readonly MAX_DUPLICATE_COUNT = 5;

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

    if (type === CreateType.HASH) {
      return this.addShortUrlByHash(longUrl);
    }

    const shortUrl = UrlFactory.of(type).createUrl(longUrl);
    await this.shortUrlRepository.save(ShortUrl.of(longUrl, shortUrl));
    return shortUrl;
  }

  private async addShortUrlByHash(longUrl: string) {
    let url = `${this.DOMAIN}/${hash(longUrl).slice(0, this.URL_LENGTH)}`;
    const exist = await this.shortUrlRepository.findOneBy({
      url: url,
    });

    if (exist) {
      url = await this.getUniqueShortUrl(url);
    }

    await this.shortUrlRepository.save(ShortUrl.of(longUrl, url));
    return url;
  }

  private async getUniqueShortUrl(shortUrl: string, retryCount = 0) {
    if (retryCount >= this.MAX_DUPLICATE_COUNT) {
      throw new InternalServerErrorException(
        'short url hash 생성에 문제가 발생했습니다.',
      );
    }

    const shortUrlWithPadding = shortUrl + this.PADDING_VALUE;
    const exist = await this.shortUrlRepository.findOneBy({
      url: shortUrlWithPadding,
    });

    if (exist) {
      return this.getUniqueShortUrl(shortUrlWithPadding, retryCount + 1);
    }

    return shortUrlWithPadding;
  }
}
