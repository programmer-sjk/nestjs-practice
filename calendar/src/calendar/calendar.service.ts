import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { PaginationRequest } from '../common/pagination/pagination.request';
import { PaginationResponse } from '../common/pagination/pagination.response';
import { CalendarsResponse } from './dto/calendars.response';
import { RegisterCalendarRequest } from './dto/register-calendar.request';
import { UpdateCalendarRequest } from './dto/update-calendar.request';
import { CalendarAlarmRepository } from './repositories/calendar-alarm.repository';
import { CalendarUserRepository } from './repositories/calendar-user.repository';
import { CalendarRepository } from './repositories/calendar.repository';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRepository: CalendarRepository,
    private readonly calendarUserRepository: CalendarUserRepository,
    private readonly calendarAlarmRepository: CalendarAlarmRepository,
  ) {}

  async findAll(request: PaginationRequest) {
    const { limit, offset } = request;
    const [calendars, totalCount] = await this.calendarRepository.findAll(
      limit,
      offset,
    );

    return new PaginationResponse(
      limit,
      totalCount,
      offset,
      calendars.map(
        (calendar) =>
          new CalendarsResponse(
            calendar.id,
            calendar.title,
            calendar.startDate,
            calendar.endDate,
            calendar.calendarUsers.map((calendarUser) => calendarUser.user),
          ),
      ),
    );
  }

  async addCalendar(request: RegisterCalendarRequest) {
    const calendar = request.toEntity();
    calendar.updateCalendarUsers(request.toCalendarUserEntity(calendar.id));
    calendar.updateCalendarAlarm(request.toAlarmEntity(calendar.id));
    await this.calendarRepository.save(calendar);
  }

  async updateCalendar(request: UpdateCalendarRequest) {
    const calendar = await this.findCalendarWith(request.id);
    calendar.calendarAlarm.update(request.alarmType, request.ringMinuteBefore);
    calendar.update(
      request.title,
      request.startDate,
      request.endDate,
      request.toCalendarUserEntity(calendar.id),
      calendar.calendarAlarm,
    );

    await this.calendarRepository.save(calendar);
  }

  @Transactional()
  async removeCalendar(id: number) {
    const calendar = await this.findCalendarWith(id);
    await this.calendarRepository.remove(calendar);
    await this.calendarUserRepository.remove(calendar.calendarUsers);
    await this.calendarAlarmRepository.remove(calendar.calendarAlarm);
  }

  private async findCalendarWith(calendarId: number) {
    return this.calendarRepository.findOneOrFail({
      where: { id: calendarId },
      relations: ['calendarUsers', 'calendarAlarm'],
    });
  }
}
