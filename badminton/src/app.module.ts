import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './../ormconfig';
import { CoachModule } from './coach/coach.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), CoachModule],
})
export class AppModule {}

// private isDateRangeOverlap(
//   startA: Date,
//   endA: Date,
//   startB: Date,
//   endB: Date,
// ) {
//   if (startA < endB && endA > startB) {
//     return true;
//   }

//   return false;
// }
