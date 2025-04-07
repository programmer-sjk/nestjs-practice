import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService {
  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get<string>('CLIENT_ID'));
  }
}
