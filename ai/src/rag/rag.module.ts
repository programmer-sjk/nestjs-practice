import { Module } from '@nestjs/common';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';

@Module({
  providers: [RagService],
  controllers: [RagController],
})
export class RagModule {}
