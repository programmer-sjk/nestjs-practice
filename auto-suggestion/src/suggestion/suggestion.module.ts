import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';
import { SearchDailySumRepository } from './suggestion.repository';
import { SuggestionService } from './suggestion.service';

@Module({
  controllers: [SuggestionController],
  providers: [SuggestionService, SearchDailySumRepository],
})
export class SuggestionModule {}
