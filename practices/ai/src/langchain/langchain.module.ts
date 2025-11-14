import { Module } from '@nestjs/common';
import { LangchainController } from './langchain.controller';
import { LangchainService } from './langchain.service';

@Module({
  providers: [LangchainService],
  controllers: [LangchainController],
})
export class LangchainModule {}
