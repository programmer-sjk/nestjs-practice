import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';

@Module({
  imports: [RedisModule],
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
