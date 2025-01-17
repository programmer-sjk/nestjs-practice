import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { PaginationRequest } from '../common/pagination/pagination.request';
import { PaginationResponse } from '../common/pagination/pagination.response';
import { CalendarsResponse } from './dto/calendars.response';
import { RegisterCalendarRequest } from './dto/register-calendar.request';
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

  async findAll(request: PaginationRequest) {
    const { limit, offset } = request;
    console.log(request);
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
    calendar.calendarUsers = request.userIds.map((userId) =>
      CalendarUser.of(calendar.id, userId),
    );
    await this.calendarRepository.save(calendar);
  }

  async updateCalendar(request: UpdateCalendarRequest) {
    const calendar = await this.findCalendarWithUsers(request.id);
    calendar.update(request.title, request.startDate, request.endDate);

    const [newUserIds, deletedUserIds] = this.getNewAndDeletedUserIds(
      calendar.calendarUsers.map((calendarUser) => calendarUser.userId),
      request.userIds,
    );

    await this.updateCalendarWithUsers(calendar, newUserIds, deletedUserIds);
  }

  private getNewAndDeletedUserIds(prevUserIds, userIds): [number[], number[]] {
    const newUserIds = userIds.filter(
      (userId) => !prevUserIds.find((prevUserId) => prevUserId === userId),
    );

    const deletedUserIds = prevUserIds.filter(
      (prevUserId) => !userIds.find((userId) => userId === prevUserId),
    );

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

    if (newUserIds.length) {
      const newCalendarUsers = newUserIds.map((userId) =>
        CalendarUser.of(calendar.id, userId),
      );
      await this.calendarUserRepository.save(newCalendarUsers);
    }
  }

  @Transactional()
  async removeCalendar(id: number) {
    const calendar = await this.findCalendarWithUsers(id);
    await this.calendarRepository.remove(calendar);
    await this.calendarUserRepository.remove(calendar.calendarUsers);
  }

  private async findCalendarWithUsers(calendarId: number) {
    return this.calendarRepository.findOneOrFail({
      where: { id: calendarId },
      relations: ['calendarUsers'],
    });
  }
}
