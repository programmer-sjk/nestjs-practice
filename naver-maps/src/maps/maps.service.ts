import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService {
  private readonly staticUrl = 'https://maps.apigw.ntruss.com/map-static/v2';
  private readonly clientId: string;
  private readonly secret: string;
  private readonly apiKeyId: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('CLIENT_ID');
    this.secret = this.configService.get<string>('CLIENT_SECRET');
    this.apiKeyId = this.configService.get<string>('API_KEY_ID');
  }

  async getMaps() {
    const url =
      this.staticUrl +
      `/raster-cors?w=300&h=300&center=127.1054221,37.3591614&level=16&X-NCP-APIGW-API-KEY-ID=${this.apiKeyId}`;
    // const result = await axios.get(``);
  }
}
