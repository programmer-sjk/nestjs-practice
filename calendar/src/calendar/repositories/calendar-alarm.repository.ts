import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CalendarAlarm } from '../entities/calendar-alarm.entity';
import { CalendarUser } from '../entities/calendar-user.entity';

@Injectable()
export class CalendarAlarmRepository extends Repository<CalendarAlarm> {
  constructor(private readonly dataSource: DataSource) {
    super(CalendarAlarm, dataSource.createEntityManager());
  }
}
