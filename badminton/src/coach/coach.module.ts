import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './entity/coach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
})
export class CoachModule {}
