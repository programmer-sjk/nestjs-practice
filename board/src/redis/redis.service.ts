import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly incrAmount = 1;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async zincrby(key: string, member: string) {
    return this.redis.zincrby(key, this.incrAmount, member);
  }
}
