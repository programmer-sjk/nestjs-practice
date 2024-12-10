import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Coach } from './entities/coach.entity';

@Injectable()
export class CoachRepository extends Repository<Coach> {
  constructor(private readonly dataSource: DataSource) {
    super(Coach, dataSource.createEntityManager());
  }
}
