import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), SuggestionModule],
})
export class AppModule {}
