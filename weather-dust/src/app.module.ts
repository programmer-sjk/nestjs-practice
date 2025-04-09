import { Module } from '@nestjs/common';
import { DustModule } from './dust/dust.module';

@Module({
  imports: [DustModule]
})
export class AppModule {}
