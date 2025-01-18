import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseEntity } from './../../../product-store/src/common/response-entity';
import { CalendarService } from './calendar.service';
import { RegisterCalendarRequest } from './dto/register-calendar.reuqest';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  async findAll() {
    return this.calendarService.findAll();
  }

  @Post()
  async register(
    @Body() request: RegisterCalendarRequest,
  ): Promise<ResponseEntity<string>> {
    await this.calendarService.addCalendar(request);
    return ResponseEntity.OK();
  }
}
