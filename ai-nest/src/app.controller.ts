/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MemorySaver } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
// LangGraph imports - 이미 위에서 가져옴

import { Body, Controller, Post } from '@nestjs/common';

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

  @Post()
  async test(@Body('prompt') prompts: string[]) {
    // return this.appService.generateImage(prompts);
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
}
