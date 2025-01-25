import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './../ormconfig';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { CoachModule } from './coach/coach.module';
import { LessonModule } from './lesson/lesson.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    CoachModule,
    UserModule,
    AuthModule,
    LessonModule,
    ConfigModule,
    JwtModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
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
