import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private readonly weatherUrl;

  constructor(private readonly configService: ConfigService) {
    const authKey = this.configService.get('WEATHER_AUTH_KEY');
    this.weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${authKey}`
  }
}
