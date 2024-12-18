import { Controller, Param, Post } from '@nestjs/common';

@Controller('short-url')
export class ShortUrlController {
  @Post(':type')
  async addShortUrl(@Param('type') type: string) {}
}
