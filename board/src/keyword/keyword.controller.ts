import { Controller, Get } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { KeywordService } from './keyword.service';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Get('post')
  async postPopularKeyword() {
    const keywords = await this.keywordService.getPostPopularKeywords();
    return ResponseEntity.OK(keywords)
  }
}
