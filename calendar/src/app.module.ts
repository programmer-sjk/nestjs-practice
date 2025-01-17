import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CalendarModule],
})
export class AppModule {}
