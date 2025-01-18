import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { CalendarService } from './calendar.service';
import { CalendarsResponse } from './dto/calendars.response';
import { RegisterCalendarRequest } from './dto/register-calendar.reuqest';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  async findAll(): Promise<ResponseEntity<CalendarsResponse[] | string>> {
    const calendars = await this.calendarService.findAll();
    return ResponseEntity.OK(calendars);
  }

  @Post()
  async register(
    @Body() request: RegisterCalendarRequest,
  ): Promise<ResponseEntity<string>> {
    await this.calendarService.addCalendar(request);
    return ResponseEntity.OK();
  }
}
