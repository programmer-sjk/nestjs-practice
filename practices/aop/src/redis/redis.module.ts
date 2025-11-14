import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheRegister } from './redis-cache-register';
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

        return { store };
      },
    }),
    DiscoveryModule,
  ],

  providers: [RedisService, RedisCacheRegister],
  exports: [RedisService],
})
export class RedisModule {}
