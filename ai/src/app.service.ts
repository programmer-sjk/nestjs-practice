import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import { MongoDBSaver } from '@langchain/langgraph-checkpoint-mongodb';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { TavilySearch } from '@langchain/tavily';
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  private readonly model: ChatOpenAI;
  private readonly checkpointer: BaseCheckpointSaver;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4.1-mini',
    });

    // Option 1: MemorySaver (개발용)
    // this.checkpointer = new MemorySaver();

    // Option 2: CustomRedisCheckpointSaver (직접 구현)
    // this.checkpointer = new CustomRedisCheckpointSaver(new Redis());

    // Option 3: MongoDBSaver (공식 패키지 - 실무 권장)
    this.checkpointer = new MongoDBSaver({
      client: new MongoClient(process.env.MONGODB_CONNECTION_STRING ?? ''),
      dbName: 'glit',
      checkpointCollectionName: 'checkpoints',
      checkpointWritesCollectionName: 'checkpoint_writes',
    });
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
