import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  imports: [
    IORedisModule.forRoot({
      type: 'single',
      url: 'localhost',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
