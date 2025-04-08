import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { ResponseType } from 'axios';
import { AddressResponse } from './dto/address.response';

@Injectable()
export class MapsService {
  private readonly staticUrl = 'https://maps.apigw.ntruss.com/map-static/v2';
  private readonly geocodeUrl =
    'https://maps.apigw.ntruss.com/map-geocode/v2/geocode';
  private readonly bufferType = 'arraybuffer';
  private readonly clientId: string;
  private readonly secret: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('CLIENT_ID');
    this.secret = this.configService.get<string>('CLIENT_SECRET');
  }

  async getStaticMaps() {
    const url =
      this.staticUrl +
      `/raster?w=800&h=800&center=126.944878,37.587699&level=16`;

    const result = await this.sendRequestNaver(url, this.bufferType);
    return result.data;
  }

  async getAddress(address: string) {
    const result = await this.getAddressInfo(address);
    const addressInfo = result.data.addresses[0];

    return new AddressResponse(
      addressInfo.roadAddress,
      addressInfo.jibunAddress,
    );
  }

  async searchMaps(address: string) {}

  private async getAddressInfo(address: string) {
    const url = `${this.geocodeUrl}?query=${address}`;
    return this.sendRequestNaver(url);
  }

  private async sendRequestNaver(url, responseType?: ResponseType) {
    return axios.get(url, {
      responseType: responseType ?? 'json',
      headers: {
        'Content-Type': 'application/json',
        'x-ncp-apigw-api-key-id': this.clientId,
        'x-ncp-apigw-api-key': this.secret,
      },
    });
  }
}
