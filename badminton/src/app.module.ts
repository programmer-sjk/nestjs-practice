import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './../ormconfig';
import { CoachModule } from './coach/coach.module';
import { UserModule } from './user/user.module';
import { Controller } from './.controller';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), CoachModule, UserModule],
  controllers: [Controller],
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
