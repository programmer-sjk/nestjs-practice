import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
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

  async simplePrompt() {
    return ChatPromptTemplate.fromMessages([
      ['system', '결과만 리턴해주세요.'],
      ['human', '3곱하기 {number}은?'],
    ])
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .invoke({ number: 10 });
  }

  async simplePrompt2(prompt: string) {
    const chatPrompt = PromptTemplate.fromTemplate(prompt);
    return chatPrompt
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .invoke({ prompt });
  }

  async multipleChain() {
    const multiplyChain1 = ChatPromptTemplate.fromMessages([
      [
        'system',
        '결과만 리턴해주세요. 예를 들어 3곱하기 3은 9입니다. 에서 9만 리턴하세요',
      ],
      ['human', '3곱하기 {number}은?'],
    ])
      .pipe(this.model)
      .pipe(new StringOutputParser());

    const multiplyChain2 = ChatPromptTemplate.fromMessages([
      ['human', '5곱하기 {number}은?'],
    ])
      .pipe(this.model)
      .pipe(new StringOutputParser());

    return RunnableSequence.from([
      { number: multiplyChain1 },
      multiplyChain2,
    ]).invoke({
      number: 1,
    });
  }
}
