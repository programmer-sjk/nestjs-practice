import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Render,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @ApiOperation({ description: '정적 지도 이미지 반환' })
  @Get()
  async getStaticMaps(@Res() res: Response) {
    const result = await this.mapsService.getStaticMaps();
    return res.contentType('image/jpeg').send(result);
  }

  @ApiOperation({ description: '줌이 가능한 동적 html 반환' })
  @Get('dynamic')
  @Render('dynamic-map')
  async getDynamicMaps(@Query('addr') address: string) {
    const addressInfo = await this.mapsService.getAddressInfo(address);
    return {
      requestUrl: this.mapsService.getDynamicMapUrl(),
      x: addressInfo.x,
      y: addressInfo.y,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ description: '검색한 주소에 대한 도로명/지번 주소 반환' })
  @Get('address')
  async getAddress(@Query('q') address: string) {
    return this.mapsService.getAddress(address);
  }

  @ApiOperation({ description: '검색한 주소에 대한 정적 이미지 반환' })
  @Get('search')
  async search(@Query('addr') address: string, @Res() res: Response) {
    const result = await this.mapsService.searchMaps(address);
    return res.contentType('image/jpeg').send(result);
  }
}
