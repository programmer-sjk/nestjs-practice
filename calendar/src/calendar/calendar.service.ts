import { Injectable } from '@nestjs/common';
import { CalendarRepository } from './calendar.repository';
import { RegisterCalendarRequest } from './dto/register-calendar.reuqest';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async findAll() {
    return this.calendarRepository.findAll();
  }

  async addCalendar(request: RegisterCalendarRequest) {
    await this.calendarRepository.save(request.toEntity());
  }
}
