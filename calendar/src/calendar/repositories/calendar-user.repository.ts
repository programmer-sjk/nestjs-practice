import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CalendarUser } from '../entities/calendar-user.entity';

@Injectable()
export class CalendarUserRepository extends Repository<CalendarUser> {
  constructor(private readonly dataSource: DataSource) {
    super(CalendarUser, dataSource.createEntityManager());
  }
}
