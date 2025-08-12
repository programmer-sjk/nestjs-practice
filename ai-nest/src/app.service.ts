import { GoogleGenAI } from '@google/genai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  private readonly openaiClient: OpenAI;
  private readonly model: ChatOpenAI;
  private readonly gemini: GoogleGenAI;

  constructor() {
    this.openaiClient = new OpenAI();
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
    });
    this.gemini = new GoogleGenAI({});
  }

  async openai(prompt: string) {
    const chatPrompt = ChatPromptTemplate.fromMessages([
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'human',
        content: '{prompt}',
      },
    ]);

    return chatPrompt
      .pipe(this.model)
      .pipe(new StringOutputParser())
      .invoke({ prompt });
  }
}
