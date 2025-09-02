import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LanggraphService } from './langgraph.service';

@Controller('langgraph')
export class LanggraphController {
  constructor(private readonly langgraphService: LanggraphService) {}

  @Get()
  async test() {
    return this.langgraphService.test();
  }

  @Post('langgraph')
  async graphWithCheckPoint(
    @Query('userId') userId: number,
    @Query('isErr') isErr: boolean,
    @Body('prompt') prompt: string,
  ) {
    return this.langgraphService.recoverFromFailPoint(userId, isErr, prompt);
  }
}
