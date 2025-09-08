import { Module } from '@nestjs/common';
import { LanggraphController } from './langgraph.controller';
import { LanggraphService } from './langgraph.service';

@Module({
  providers: [LanggraphService],
  controllers: [LanggraphController],
})
export class LanggraphModule {}
