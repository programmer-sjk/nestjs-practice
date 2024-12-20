import { Module } from '@nestjs/common';
import { SuggestionController } from './suggestion.controller';

@Module({
  controllers: [SuggestionController]
})
export class SuggestionModule {}
