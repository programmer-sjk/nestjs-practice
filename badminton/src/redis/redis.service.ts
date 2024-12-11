import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return this.cacheManager.get(key);
  }

  async set<T>(key: string, data: T, ttlMilliSecond: number) {
    return this.cacheManager.set(key, data, ttlMilliSecond);
  }

  async del(key: string) {
    return this.cacheManager.del(key);
  }
}
