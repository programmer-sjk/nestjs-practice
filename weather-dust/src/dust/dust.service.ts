import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class DustService {
  private readonly startIdx = 1;
  private readonly endIdx = 25;

  private readonly authKey;
  private readonly dustUrl;

  constructor(private readonly configService: ConfigService) {
    this.authKey = this.configService.get('DUST_AUTH_KEY');
    this.dustUrl = `http://openapi.seoul.go.kr:8088/${this.authKey}/json/ListAirQualityByDistrictService/${this.startIdx}/${this.endIdx}`;
  }

  async getCurrentInfo() {
    const dustInfo = await axios.get(this.dustUrl);
    return dustInfo.data;
  }
}
