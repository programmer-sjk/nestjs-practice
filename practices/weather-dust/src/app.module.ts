import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DustModule } from './dust/dust.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DustModule,
    WeatherModule,
  ],
})
export class AppModule {}
