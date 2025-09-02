/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// LangGraph imports - 이미 위에서 가져옴

import { Body, Controller, Post } from '@nestjs/common';

import ollama from 'ollama';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
