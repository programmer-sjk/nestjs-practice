import { Controller, Get, Post, Query } from '@nestjs/common';
import { LanggraphService } from './langgraph.service';

@Controller('langgraph')
export class LanggraphController {
  constructor(private readonly langgraphService: LanggraphService) {}

  @Get()
  async simpleGraph() {
    return this.langgraphService.simpleGraph();
  }

  @Post()
  async graphWithCheckPoint(
    @Query('userId') userId: number,
    @Query('isErr') isErr: boolean,
  ) {
    return this.langgraphService.recoverFromFailPoint(userId, isErr);
  }
}
