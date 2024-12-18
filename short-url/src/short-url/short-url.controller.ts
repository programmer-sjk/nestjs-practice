import { Controller, Param, Post } from '@nestjs/common';
import { CreateType } from './enums/create-type.enum';

@Controller('short-url')
export class ShortUrlController {
  @Post(':type')
  async addShortUrl(@Param('type') type: CreateType) {
    switch (type) {
      case CreateType.HASH: return
    }
  }
}
