import { Module } from '@nestjs/common';
import { CoachRepository } from './coach.repository';

@Module({
  providers: [CoachRepository],
  exports: [CoachRepository],
})
export class CoachModule {}
