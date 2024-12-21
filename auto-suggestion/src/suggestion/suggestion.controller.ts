import { Controller, Post } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';

@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post()
  async createAutoSuggestions() {
    return this.suggestionService.createAutoSuggestions();
  }
}
