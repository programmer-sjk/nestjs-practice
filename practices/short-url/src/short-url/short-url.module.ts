import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlRepository } from './short-url.repository';
import { ShortUrlService } from './short-url.service';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService, ShortUrlRepository],
})
export class ShortUrlModule {}
