import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class RedisService {
  private readonly redlock: Redlock;
  private readonly lockDuration = 3_000;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.redlock = new Redlock([this.redis], { retryCount: 20 });
  }

  async acquireLock(key: string) {
    return this.redlock.acquire([`lock:${key}`], this.lockDuration);
  }

  async incr(key: string) {
    return this.redis.incr(key);
  }

  async sadd(key: string, member: number) {
    return this.redis.sadd(key, member);
  }
}
