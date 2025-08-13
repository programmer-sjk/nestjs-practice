/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Annotation,
  END,
  MemorySaver,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
// LangGraph imports - 이미 위에서 가져옴

import { Body, Controller, Post, Query } from '@nestjs/common';

import ollama from 'ollama';
import OpenAI from 'openai';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly openaiClient: OpenAI;
  private readonly model: ChatOpenAI;

  // LangGraph 실제 체크포인터 (메모리 세이버)
  private readonly checkpointer = new MemorySaver();

  constructor(private readonly appService: AppService) {
    this.openaiClient = new OpenAI();
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
    });
  }

  @Post('test')
  test2(@Body('prompt') prompt: string) {
    return this.appService.test2(prompt);
  }

  @Post()
  async test(
    @Body('prompt') prompt: string,
    @Query('userId') userId: number,
    @Query('isErr') isErr: boolean,
  ) {
    return this.appService.test(prompt, userId, isErr);
  }

  @Post()
  async getOllama(@Body('prompt') prompt: string) {
    const response = await ollama.chat({
      model: 'llama3.2:1b',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.message.content;
  }

  @Post('openai')
  async getOpenAi(@Body('prompt') prompt: string) {
    return this.appService.openai(prompt);
  }

  @Post('search-ai')
  async serachInternetOnAi(@Body('prompt') prompt: string) {
    return this.appService.searchInternet(prompt);
  }

  @Post('real-langgraph')
  async realLangGraph(
    @Body('prompt') prompt: string,
    @Body('threadId') threadId: string = 'default',
  ) {
    console.log('📥 Input:', { prompt, threadId });
    try {
      const app = this.createRealLangGraphWorkflow();
      const config = {
        configurable: {
          thread_id: threadId,
        },
      };

      const existingCheckpoint = await app.getState(config);

      console.log('🔍 Raw checkpoint:', existingCheckpoint);

      const hasValidCheckpoint =
        existingCheckpoint &&
        existingCheckpoint.values &&
        Object.keys(existingCheckpoint.values as Record<string, any>).length >
          0 &&
        existingCheckpoint.values.current_step &&
        existingCheckpoint.values.current_step !== START;

      if (hasValidCheckpoint) {
        const checkpointState = (existingCheckpoint as any).values;
        console.log('🔄 Found valid checkpoint:', checkpointState);

        if (
          checkpointState.current_step === END &&
          checkpointState.final_response &&
          checkpointState.final_response.trim() !== ''
        ) {
          console.log('✅ Workflow already completed, returning cached result');
          return {
            result: checkpointState.final_response,
            method: 'real_langgraph_cached',
            threadId,
            state: checkpointState,
            fromCache: true,
            message: 'Returned completed workflow result',
          };
        }

        console.log(
          '🔄 Resuming incomplete workflow from:',
          checkpointState.current_step,
        );
        const result = await app.invoke(null, config);

        return {
          result: (result as any).final_response,
          method: 'real_langgraph_resumed',
          threadId,
          state: result,
          resumed: true,
          message: `Successfully resumed from checkpoint at step: ${checkpointState.current_step}`,
        };
      } else {
        console.log(
          `🚀 Starting new LangGraph execution for thread: ${threadId}`,
        );

        const result = await app.invoke(
          {
            messages: [prompt],
            current_step: START,
            first_response: '',
            final_response: '',
          },
          config,
        );

        return {
          result: (result as any).final_response,
          method: 'real_langgraph_new',
          threadId,
          state: result,
          checkpointed: true,
          message: 'Executed new workflow with automatic checkpointing',
        };
      }
    } catch (error: any) {
      const app = this.createRealLangGraphWorkflow();
      const config = { configurable: { thread_id: threadId } };

      try {
        const checkpoint = await app.getState(config);
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
          method: 'real_langgraph_failed',
          threadId,
          checkpoint: (checkpoint as any)?.values,
          canResume: true,
          message:
            'Failed but checkpoint saved - retry with same threadId to resume',
        };
      } catch {
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
          method: 'real_langgraph_failed',
          threadId,
          canResume: false,
        };
      }
    }
  }

  private createRealLangGraphWorkflow() {
    const GraphAnnotation = Annotation.Root({
      messages: Annotation<string[]>({
        reducer: (currentState, updateValue) =>
          currentState.concat(
            Array.isArray(updateValue) ? updateValue : [updateValue],
          ),
        default: () => [],
      }),
      current_step: Annotation<string>({
        reducer: (currentState, updateValue) => updateValue ?? currentState,
        default: () => 'start',
      }),
      first_response: Annotation<string>({
        reducer: (currentState, updateValue) => updateValue ?? currentState,
        default: () => '',
      }),
      final_response: Annotation<string>({
        reducer: (currentState, updateValue) => updateValue ?? currentState,
        default: () => '',
      }),
    });

    const workflow = new StateGraph(GraphAnnotation);

    const firstLlmNode = async (state: any) => {
      console.log('🆕 First LLM execution starting...');
      const targetIdx = state.messages.length - 1;
      const response = await this.model.invoke([
        {
          role: 'user',
          content: (state as any).messages[targetIdx] || 'Hello',
        },
      ]);

      return {
        first_response: (response as any).content,
        current_step: 'first_complete',
      };
    };

    const secondLlmNode = async (state: any) => {
      if (state.messages[0] === '내 이름은 정국이야') {
        console.log('💥 Test failure triggered:', state.messages[0]);
        throw new Error('testt');
      }

      console.log('🆕 Second LLM execution starting...');
      const completion = await this.openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: (state as any).first_response }],
      });

      return {
        final_response: (completion as any).choices[0].message.content,
        current_step: END as typeof END,
      };
    };

    workflow
      .addNode('first_llm', firstLlmNode)
      .addNode('second_llm', secondLlmNode)
      .addEdge(START, 'first_llm')
      .addEdge('first_llm', 'second_llm')
      .addEdge('second_llm', END);

    return workflow.compile({ checkpointer: this.checkpointer }) as any;
  }
}
