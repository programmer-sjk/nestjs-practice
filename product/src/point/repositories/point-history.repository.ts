import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PointHistory } from './../entities/point-history.entity';

@Injectable()
export class PointHistoryRepository extends Repository<PointHistory> {
  constructor(private readonly dataSource: DataSource) {
    super(PointHistory, dataSource.createEntityManager());
  }
}
