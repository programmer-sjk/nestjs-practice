import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class KeywordService {
  private readonly keywordsCount = 5;
  private readonly postKeywordKey = 'sorted-set:post:popular-keyword';

  constructor(private readonly redisService: RedisService) {}

  async getPostPopularKeywords() {
    return this.redisService.zrevrange(this.postKeywordKey, this.keywordsCount);
  }
}
