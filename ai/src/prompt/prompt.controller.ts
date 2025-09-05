import { Body, Controller, Post } from '@nestjs/common';
import { PromptService } from './prompt.service';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post('simple')
  async simplePrompt() {
    return this.promptService.simplePrompt();
  }

  @Post('simple2')
  async simplePrompt2(@Body('prompt') prompt: string) {
    return this.promptService.simplePrompt2(prompt);
  }

  @Post('multi-chain')
  async multipleChain() {
    return this.promptService.multipleChain();
  }

  @Post('few-shot')
  async fewShot(@Body('prompt') prompt: string) {
    return this.promptService.fewShotExample(prompt);
  }
}
