import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddShortUrlRequest } from './dto/add-short-url-request';
import { OriginalUrlRequest } from './dto/original-url.request';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get()
  async originalUrl(@Body() request: OriginalUrlRequest): Promise<string> {
    return this.shortUrlService.getOriginalUrl(request.shortUrl);
  }

  @Post(':type')
  async addShortUrl(
    @Param('type') type: CreateType,
    @Body() request: AddShortUrlRequest,
  ): Promise<string> {
    return this.shortUrlService.addShortUrl(type, request.longUrl);
  }
}
