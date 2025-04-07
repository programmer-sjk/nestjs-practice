import { Controller, Get, Query, Res } from '@nestjs/common';
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

  @Get('search')
  async search(@Query('addr') address: string) {
    return this.mapsService.search(address);
  }
}
