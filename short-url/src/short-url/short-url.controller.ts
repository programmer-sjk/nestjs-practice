import { BadRequestException, Controller, Param, Post } from '@nestjs/common';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post(':type')
  async addShortUrl(@Param('type') type: CreateType) {
    switch (type) {
      case CreateType.HASH:
        return this.shortUrlService.shortUrlByHash();
      case CreateType.RAW:
        return this.shortUrlService.shortUrlByBaseCalculation();
      case CreateType.LIB:
        return this.shortUrlService.shortUrlByBase62();
      default:
        throw new BadRequestException('허용하지 않는 생성 타입입니다.');
    }
  }
}
