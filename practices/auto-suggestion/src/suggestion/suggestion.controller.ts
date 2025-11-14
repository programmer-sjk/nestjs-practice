import { Controller, Get, Post, Query } from '@nestjs/common';
import { AutoCompleteKeywords } from './dto/auto-complete-keywords.request';
import { SuggestionService } from './suggestion.service';

@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Get()
  async autoCompleteKeywords(@Query() request: AutoCompleteKeywords) {
    return this.suggestionService.getAutoSuggestions(request);
  }

  @Post()
  async createAutoSuggestions() {
    return this.suggestionService.createAutoSuggestions();
  }
}
