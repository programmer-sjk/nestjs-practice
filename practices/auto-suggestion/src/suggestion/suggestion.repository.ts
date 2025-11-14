import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SearchDailySum } from './entities/search-daily-sum.entity';

@Injectable()
export class SearchDailySumRepository extends Repository<SearchDailySum> {
  constructor(private readonly dataSource: DataSource) {
    super(SearchDailySum, dataSource.createEntityManager());
  }
}
