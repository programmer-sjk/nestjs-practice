import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarAlarmRepository } from './repositories/calendar-alarm.repository';
import { CalendarUserRepository } from './repositories/calendar-user.repository';
import { CalendarRepository } from './repositories/calendar.repository';

@Module({
  providers: [
    CalendarService,
    CalendarRepository,
    CalendarUserRepository,
    CalendarAlarmRepository,
  ],
  controllers: [CalendarController],
})
export class CalendarModule {}
