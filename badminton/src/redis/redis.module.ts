import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisService } from './redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
    }),
    IORedisModule.forRoot({
      type: 'single',
      url: 'localhost',
    }),
  ],

  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
