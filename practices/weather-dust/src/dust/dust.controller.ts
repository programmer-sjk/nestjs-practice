import { Controller, Get } from '@nestjs/common';
import { DustService } from './dust.service';

@Controller('dust')
export class DustController {
  constructor(private readonly dustService: DustService) {}

  @Get()
  async getCurrentDustInfo() {
    return this.dustService.getCurrentInfo();
  }
}
