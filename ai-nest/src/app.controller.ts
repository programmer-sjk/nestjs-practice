import { ChatOpenAI } from '@langchain/openai';
import { Body, Controller, Post } from '@nestjs/common';

import ollama from 'ollama';
import OpenAI from 'openai';

@Controller()
export class AppController {
  private readonly openaiClient: OpenAI;
  private readonly model: ChatOpenAI;

  constructor() {
    this.openaiClient = new OpenAI();

    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
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

  @Post('openai')
  async getOpenAi(@Body('prompt') prompt: string) {
    const completion = await this.openaiClient.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0].message.content;
  }
}
