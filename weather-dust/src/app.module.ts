import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DustModule } from './dust/dust.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DustModule,
  ],
})
export class AppModule {}
