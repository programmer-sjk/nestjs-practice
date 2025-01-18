import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarUserRepository } from './repositories/calendar-user.repository';
import { CalendarRepository } from './repositories/calendar.repository';

@Module({
  providers: [CalendarService, CalendarRepository, CalendarUserRepository],
  controllers: [CalendarController],
})
export class CalendarModule {}
