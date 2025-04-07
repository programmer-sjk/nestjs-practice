import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService {
  private readonly clientId: string;
  private readonly secret: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('CLIENT_ID');
    this.secret = this.configService.get<string>('CLIENT_SECRET');
  }

  async getMaps() {}
}
