import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Calendar } from '../entities/calendar.entity';

@Injectable()
export class CalendarRepository extends Repository<Calendar> {
  constructor(private readonly dataSource: DataSource) {
    super(Calendar, dataSource.createEntityManager());
  }

  async findAll(limit: number, offset: number) {
    return this.createQueryBuilder('calendar')
      .innerJoinAndSelect('calendar.calendarUsers', 'calendarUsers')
      .innerJoinAndSelect('calendarUsers.user', 'user')
      .take(limit)
      .offset(offset)
      .getManyAndCount();
  }
}
