import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MapsService {
  private readonly staticUrl = 'https://maps.apigw.ntruss.com/map-static/v2';
  private readonly geocodeUrl =
    'https://maps.apigw.ntruss.com/map-geocode/v2/geocode';
  private readonly clientId: string;
  private readonly secret: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('CLIENT_ID');
    this.secret = this.configService.get<string>('CLIENT_SECRET');
  }

  async getStaticMaps() {
    const url =
      this.staticUrl +
      `/raster?w=800&h=800&center=127.1054221,37.3591614&level=16`;

    const result = await this.sendRequestNaver(url);
    return result.data;
  }

  async search(address: string) {}

  private async sendRequestNaver(url) {
    return axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        'x-ncp-apigw-api-key-id': this.clientId,
        'x-ncp-apigw-api-key': this.secret,
      },
    });
  }
}
