import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearch } from '@langchain/tavily';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { CustomRedisCheckpointSaver } from './utils/custom-redis-check-pointer';

@Injectable()
export class AppService {
  private readonly model: ChatOpenAI;
  private readonly checkpointer: BaseCheckpointSaver;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });

    // this.checkpointer = new MemorySaver();
    this.checkpointer = new CustomRedisCheckpointSaver(new Redis());
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

  async recoverFromFailPoint(userId: number, isErr: boolean, prompt: string) {
    const config = { configurable: { thread_id: userId } };

    const node1 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 1은?' });

      return {
        messages: [...state.messages, response],
        current_step: 'node1',
      };
    };

    const node2 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 2는?' });

      return {
        messages: [...state.messages, response],
        current_step: 'node2',
      };
    };

    const node3 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 3은?' });

      if (isErr) {
        throw new Error('Error');
      }

      return {
        messages: [...state.messages, response],
        current_step: 'node3',
      };
    };

    const node4 = async (state: typeof MessagesAnnotation.State) => {
      const response = await PromptTemplate.fromTemplate('{prompt}')
        .pipe(this.model)
        .pipe(new StringOutputParser())
        .invoke({ prompt: '3곱하기 4는?' });

      return {
        messages: [...state.messages, response],
        current_step: 'node4',
      };
    };

    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('node1', node1)
      .addNode('node2', node2)
      .addNode('node3', node3)
      .addNode('node4', node4)
      .addEdge(START, 'node1')
      .addEdge('node1', 'node2')
      .addEdge('node2', 'node3')
      .addEdge('node3', 'node4')
      .addEdge('node4', END)
      .compile({ checkpointer: this.checkpointer });

    const state = await workflow.getState(config);
    console.log(state);

    if (
      state.next.length > 0 ||
      (state.next.length === 0 &&
        (state.values as typeof MessagesAnnotation.State).messages?.length > 0)
    ) {
      console.log(state.values.messages);
      const result = await workflow.invoke(null, config);
      return result.messages.map((v) => v.content);
    }

    const result = await workflow.invoke({ messages: [] }, config);
    return result.messages.map((v) => v.content);
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
