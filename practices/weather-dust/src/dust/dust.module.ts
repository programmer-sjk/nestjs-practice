import { Module } from '@nestjs/common';
import { DustService } from './dust.service';
import { DustController } from './dust.controller';

@Module({
  providers: [DustService],
  controllers: [DustController]
})
export class DustModule {}
