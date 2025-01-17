import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Calendar } from './entities/calendar.entity';

@Injectable()
export class CalendarRepository extends Repository<Calendar> {
  constructor(private readonly dataSource: DataSource) {
    super(Calendar, dataSource.createEntityManager());
  }
}
