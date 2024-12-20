import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AddShortUrlRequest } from './dto/add-short-url-request';
import { OriginalUrlRequest } from './dto/original-url.request';
import { CreateType } from './enums/create-type.enum';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get()
  async originalUrl(@Body() request: OriginalUrlRequest, @Res() res: Response) {
    const url = await this.shortUrlService.getOriginalUrl(request.shortUrl);
    return res.redirect(HttpStatus.MOVED_PERMANENTLY, url);
  }

  @Post(':type')
  async addShortUrl(
    @Param('type') type: CreateType,
    @Body() request: AddShortUrlRequest,
  ): Promise<string> {
    return this.shortUrlService.addShortUrl(type, request.longUrl);
  }
}
