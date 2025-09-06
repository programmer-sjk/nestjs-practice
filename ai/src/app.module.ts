import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LangchainModule } from './langchain/langchain.module';
import { LanggraphModule } from './langgraph/langgraph.module';
import { PromptModule } from './prompt/prompt.module';
import { RagModule } from './rag/rag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PromptModule,
    LangchainModule,
    LanggraphModule,
    RagModule,
  ],
})
export class AppModule {}
