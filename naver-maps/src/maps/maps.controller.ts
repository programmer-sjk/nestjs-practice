import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  async getNaverMaps(@Res() res: Response) {
    const result = await this.mapsService.getMaps();
    return res.contentType('image/jpeg').send(result);
  }
}
