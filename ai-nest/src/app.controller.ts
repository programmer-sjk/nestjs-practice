/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GoogleGenAI } from '@google/genai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableLambda } from '@langchain/core/runnables';
import {
  Annotation,
  END,
  MemorySaver,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
// LangGraph imports - 이미 위에서 가져옴

import { Body, Controller, Post } from '@nestjs/common';

import ollama from 'ollama';
import OpenAI from 'openai';

interface ChatHistory {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LangChainChatHistory {
  role: 'system' | 'human' | 'ai'; // user → human 변경
  content: string;
}

// LangGraph State 인터페이스
interface CompositionState {
  prompt: string;
  history: LangChainChatHistory[];
  firstLlmResponse: string;
  secondLlmResponse: string;
  currentStep:
    | typeof START
    | 'first_llm'
    | 'save_history'
    | 'second_llm'
    | typeof END;
  error?: string;
  // 체크포인트 정보 추가
  completedSteps: string[];
  sessionId: string;
  lastSuccessfulStep?: string;
}

@Controller()
export class AppController {
  private readonly openaiClient: OpenAI;
  private readonly model: ChatOpenAI;
  private readonly gemini: GoogleGenAI;
  private readonly histories: ChatHistory[] = [];
  private readonly langChainHistories: LangChainChatHistory[] = [];

  // 세션별 상태 저장소 (체크포인트)
  private readonly sessionStates = new Map<string, CompositionState>();

  // LangGraph 실제 체크포인터 (메모리 세이버)
  private readonly checkpointer = new MemorySaver();

  constructor() {
    this.openaiClient = new OpenAI();
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
    });
    this.gemini = new GoogleGenAI({});

    this.histories.push({
      role: 'system',
      content: 'You are a helpful assistant.',
    });
  }

  @Post()
  async getOllama(@Body('prompt') prompt: string) {
    const response = await ollama.chat({
      model: 'llama3.2:1b',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.message.content;
  }

  @Post('image')
  async getImageByAi(@Body('prompt') prompt: string) {
    try {
      const response = await this.gemini.models.generateImages({
        model: 'imagen-4.0-generate-preview-06-06',
        prompt,
        config: {
          numberOfImages: 2,
          aspectRatio: '1:1',
        },
      });

      console.log('Gemini response structure:', Object.keys(response));
      console.log('Generated images count:', response.generatedImages?.length);

      const imageBytes = response.generatedImages?.[0].image?.imageBytes;

      if (imageBytes) {
        // Base64 데이터를 Data URL로 변환
        const base64Image = `data:image/png;base64,${imageBytes}`;

        return {
          success: true,
          prompt,
          imageUrl: base64Image,
          imageSize: imageBytes.length,
          totalImages: response.generatedImages?.length || 0,
        };
      } else {
        return {
          success: false,
          error: 'No image data received',
          rawResponse: response,
        };
      }
    } catch (error) {
      console.error('Image generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        prompt: prompt,
      };
    }
  }

  @Post('openai')
  async getOpenAi(@Body('prompt') prompt: string) {
    const completion = await this.openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [...this.histories, { role: 'user', content: prompt }],
    });

    const aiMessage = completion.choices[0].message.content;

    this.histories.push(
      { role: 'user', content: prompt },
      { role: 'assistant', content: aiMessage ?? '' },
    );

    return aiMessage;
  }

  @Post('composition')
  async compositoin(@Body('prompt') prompt: string) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ...this.langChainHistories.map(
        (history) => [history.role, history.content] as [string, string],
      ),
      ['human', prompt] as [string, string], // user → human 변경
    ]);

    const chain = promptTemplate
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .pipe(this.addHistory(prompt))
      .pipe(this.requestAnotherLlm());

    const response = await chain.invoke({});
    return response;
  }

  private addHistory(prompt: string) {
    return new RunnableLambda({
      func: (input: string) => {
        this.langChainHistories.push(
          {
            role: 'human', // user → human 변경
            content: prompt,
          },
          {
            role: 'ai',
            content: input,
          },
        );

        return input;
      },
    });
  }

  private requestAnotherLlm() {
    return new RunnableLambda({
      func: async (input: string) => {
        const completion = await this.openaiClient.chat.completions.create({
          model: 'gpt-4o',
          messages: [...this.histories, { role: 'user', content: input }],
        });

        return completion.choices[0].message.content;
      },
    });
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
