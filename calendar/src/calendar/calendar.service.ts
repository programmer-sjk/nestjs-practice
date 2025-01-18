import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CalendarsResponse } from './dto/calendars.response';
import { RegisterCalendarRequest } from './dto/register-calendar.reuqest';
import { UpdateCalendarRequest } from './dto/update-calendar.request';
import { CalendarUser } from './entities/calendar-user.entity';
import { Calendar } from './entities/calendar.entity';
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

  async updateCalendar(request: UpdateCalendarRequest) {
    const calendar = await this.calendarRepository.findOneOrFail({
      where: { id: request.id },
      relations: ['calendarUsers'],
    });
    calendar.update(request.title, request.startDate, request.endDate);

    const [newUserIds, deletedUserIds] = this.getNewAndDeletedUserIds(
      calendar.calendarUsers.map((calendarUser) => calendarUser.userId),
      request.userIds,
    );

    await this.updateCalendarWithUsers(calendar, newUserIds, deletedUserIds);
  }

  private getNewAndDeletedUserIds(prevUserIds, userIds): [number[], number[]] {
    const newUserIds = prevUserIds.filter(
      (prevUserId) => !userIds.find(prevUserId),
    );
    const deletedUserIds = userIds.filter((userId) => prevUserIds.find(userId));

    return [newUserIds, deletedUserIds];
  }

  @Transactional()
  private async updateCalendarWithUsers(
    calendar: Calendar,
    newUserIds: number[],
    deletedUserIds: number[],
  ) {
    await this.calendarRepository.save(calendar);

    if (deletedUserIds.length) {
      const deletedCalendarUsers = await this.calendarUserRepository.find({
        where: { calendarId: calendar.id, userId: In(deletedUserIds) },
      });
      await this.calendarUserRepository.remove(deletedCalendarUsers);
    }

    if (deletedUserIds.length) {
      const newCalendarUsers = newUserIds.map((userId) =>
        CalendarUser.of(calendar.id, userId),
      );
      await this.calendarRepository.save(newCalendarUsers);
    }
  }
}
