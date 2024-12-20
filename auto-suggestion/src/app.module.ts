import { Module } from '@nestjs/common';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [SuggestionModule],
})
export class AppModule {}
