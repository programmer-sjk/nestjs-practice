import { Controller, Get } from '@nestjs/common';
import { LanggraphService } from './langgraph.service';

@Controller('langgraph')
export class LanggraphController {
  constructor(private readonly langgraphService: LanggraphService) {}

  @Get()
  async test() {
    return this.langgraphService.test();
  }
}
