import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearch } from '@langchain/tavily';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });

    // Option 1: MemorySaver (개발용)
    // this.checkpointer = new MemorySaver();

    // Option 2: CustomRedisCheckpointSaver (직접 구현)
    // this.checkpointer = new CustomRedisCheckpointSaver(new Redis());
  }

  async openai(prompt: string) {
    const chatPrompt = ChatPromptTemplate.fromMessages([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'human', content: '{prompt}' },
    ]);

    return chatPrompt
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .invoke({ prompt });
  }

  async searchInternet(prompt: string) {
    const tools = [new TavilySearch({ maxResults: 3 })];

    const modelWithTools = this.model.bindTools(tools);
    const llmResponse = await modelWithTools.invoke(
      `Search for information about: ${prompt}`,
    );

    if (llmResponse.tool_calls?.length) {
      const response = (await new ToolNode(tools).invoke({
        messages: [llmResponse],
      })) as Record<string, any>;

      return JSON.parse(response.messages[0].content as string) as Record<
        string,
        any
      >;
    }

    return llmResponse.content;
  }

  // ✅ Delay 함수 (초 단위)
  private async delay(seconds: number): Promise<void> {
    console.log(`⏳ Delaying for ${seconds} seconds...`);
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }
}
