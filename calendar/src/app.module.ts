import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormOptions } from '../ormconfig';
import { CalendarModule } from './calendar/calendar.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeormOptions),
    UserModule,
    CalendarModule,
  ],
})
export class AppModule {}
