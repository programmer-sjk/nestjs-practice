import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import * as Redlock from 'redlock';

@Injectable()
export class RedisService {
  private readonly redlock: Redlock;
  private readonly lockDuration = 5_000;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.redlock = new Redlock([this.redis], { retryCount: 20 });
  }

  async acquireLock(key: string) {
    return this.redlock.acquire([`lock:${key}`], this.lockDuration);
  }
}
