import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherResponse } from './dto/weather-response';

@Injectable()
export class WeatherService {
  private readonly weatherUrl;

  constructor(private readonly configService: ConfigService) {
    const authKey = this.configService.get('WEATHER_AUTH_KEY');
    this.weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${authKey}`;
  }

  async getWeather(city: string) {
    const response = await axios.get(`${this.weatherUrl}&q=${city}`);
    const weather = response.data;
    return new WeatherResponse(
      weather.weather[0].main,
      weather.main.temp,
      weather.main.feels_like,
    );
  }
}
