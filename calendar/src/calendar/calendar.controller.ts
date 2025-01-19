import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { CalendarService } from './calendar.service';
import { CalendarsResponse } from './dto/calendars.response';
import { RegisterCalendarRequest } from './dto/register-calendar.request';
import { UpdateCalendarRequest } from './dto/update-calendar.request';

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

  @Put()
  async update(@Body() request: UpdateCalendarRequest): Promise<ResponseEntity<string>> {
    await this.calendarService.updateCalendar(request);
    return ResponseEntity.OK();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.calendarService.removeCalendar(id);
    return ResponseEntity.OK();
  }
}
