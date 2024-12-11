import { InjectRedis } from '@nestjs-modules/ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Redis from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class RedisService {
  private readonly redlock: Redlock;
  private readonly lockDuration = 10_000;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.redlock = new Redlock([redis]);
  }

  async get(key: string) {
    return this.cacheManager.get(key);
  }

  async set<T>(key: string, data: T, ttlMilliSecond: number) {
    return this.cacheManager.set(key, data, ttlMilliSecond);
  }

  async del(key: string) {
    return this.cacheManager.del(key);
  }

  async acquireLock(key: string) {
    return this.redlock.acquire([`lock:${key}`], this.lockDuration);
  }
}
