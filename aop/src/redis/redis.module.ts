import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheRegister } from './cache-register';
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
    DiscoveryModule,
  ],

  providers: [RedisService, CacheRegister],
  exports: [RedisService],
})
export class RedisModule {}
