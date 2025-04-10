import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly weatherUrl;

  constructor(private readonly configService: ConfigService) {
    const authKey = this.configService.get('WEATHER_AUTH_KEY');
    this.weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${authKey}`;
  }

  async getWeather(city: string) {
    const response = await axios.get(`${this.weatherUrl}&q=${city}`);
    return response.data;
  }
}
