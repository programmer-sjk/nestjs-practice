import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RedisService } from '../../redis/redis.service';
import { PostSearchedEvent } from '../events/post-searched.event';

@Injectable()
export class PostListener {
  private readonly postKeywordKey = 'sorted-set:post:popular-keyword';

  constructor(private readonly redisService: RedisService) {}

  @OnEvent('post.searched')
  handlePostSearchedEvent(payload: PostSearchedEvent) {
    return this.redisService.zincrby(this.postKeywordKey, payload.keyword);
  }
}
