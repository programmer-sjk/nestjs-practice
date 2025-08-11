import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableLambda } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';

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

@Controller()
export class AppController {
  private readonly openaiClient: OpenAI;
  private readonly model: ChatOpenAI;
  private readonly histories: ChatHistory[] = [];
  private readonly langChainHistories: LangChainChatHistory[] = [];

  constructor() {
    this.openaiClient = new OpenAI();

    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
    });

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
}
