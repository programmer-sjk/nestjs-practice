import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  async getStaticMaps(@Res() res: Response) {
    const result = await this.mapsService.getStaticMaps();
    return res.contentType('image/jpeg').send(result);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('address')
  async getAddress(@Query('q') address: string) {
    return this.mapsService.getAddress(address);
  }

  @Get('search')
  async search(@Query('addr') address: string, @Res() res: Response) {
    const result = await this.mapsService.searchMaps(address);
    return res.contentType('image/jpeg').send(result);
  }
}
