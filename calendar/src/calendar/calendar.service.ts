import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CalendarsResponse } from './dto/calendars.response';
import { RegisterCalendarRequest } from './dto/register-calendar.reuqest';
import { CalendarUser } from './entities/calendar-user.entity';
import { CalendarUserRepository } from './repositories/calendar-user.repository';
import { CalendarRepository } from './repositories/calendar.repository';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRepository: CalendarRepository,
    private readonly calendarUserRepository: CalendarUserRepository,
  ) {}

  async findAll() {
    const calendars = await this.calendarRepository.findAll();
    return calendars.map(
      (calendar) =>
        new CalendarsResponse(
          calendar.id,
          calendar.title,
          calendar.startDate,
          calendar.endDate,
          calendar.calendarUsers.map((calendarUser) => calendarUser.user),
        ),
    );
  }

  @Transactional()
  async addCalendar(request: RegisterCalendarRequest) {
    const calendar = await this.calendarRepository.save(request.toEntity());
    const calendarUsers = request.userIds.map((userId) =>
      CalendarUser.of(calendar.id, userId),
    );
    await this.calendarUserRepository.save(calendarUsers);
  }
}
