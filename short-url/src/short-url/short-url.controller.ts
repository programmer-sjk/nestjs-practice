import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddShortUrlRequest } from './dto/add-short-url-request';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post(':type')
  async addShortUrl(
    @Param('type') type: CreateType,
    @Body() request: AddShortUrlRequest,
  ) {
    return this.shortUrlService.addShortUrl(type, request.longUrl);
  }
}
