import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  private readonly model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });
  }

  async fewShotExample(prompt: string) {
    const chatPrompt = ChatPromptTemplate.fromMessages([
      {
        role: 'system',
        content:
          '너는 수학 선생이야. 아래 메시지 예시들을 보고 동일한 응답을 해줘', // few shot 으로는 부족했고 prompt에서 동일한 요청을 해달라고 해야 응답이 옴.
      },
      { role: 'human', content: '3 곱하기 5는?' },
      { role: 'ai', content: '15' },
      { role: 'human', content: '3곱하기 6은?' },
      { role: 'ai', content: '18' },
      { role: 'human', content: '{prompt}' },
    ]);

    return chatPrompt
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .invoke({ prompt });
  }
}
