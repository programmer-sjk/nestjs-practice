import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SearchDailySum } from './../../suggestion/entities/search-daily-sum.entity';

export default class SuggestionDailySumSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(SearchDailySum);
    await repository.insert([
      { keyword: 'app', count: 172, date: '2024-12-15' },
      { keyword: 'apple', count: 311, date: '2024-12-15' },
      { keyword: 'atena', count: 194, date: '2024-12-15' },
      { keyword: 'africa', count: 55, date: '2024-12-16' },
      { keyword: 'america', count: 701, date: '2024-12-16' },
      { keyword: 'alias', count: 33, date: '2024-12-17' },
      { keyword: 'amen', count: 255, date: '2024-12-17' },
      { keyword: 'app', count: 401, date: '2024-12-17' },
      { keyword: 'apple', count: 202, date: '2024-12-17' },
      { keyword: 'atena', count: 15, date: '2024-12-17' },
      { keyword: 'africa', count: 31, date: '2024-12-17' },
      { keyword: 'america', count: 6, date: '2024-12-18' },
      { keyword: 'alias', count: 99, date: '2024-12-18' },
      { keyword: 'amen', count: 110, date: '2024-12-19' },
      { keyword: 'app', count: 166, date: '2024-12-19' },
      { keyword: 'apple', count: 313, date: '2024-12-20' },
      { keyword: 'atena', count: 140, date: '2024-12-20' },
      { keyword: 'africa', count: 119, date: '2024-12-20' },
      { keyword: 'america', count: 87, date: '2024-12-20' },
      { keyword: 'alias', count: 32, date: '2024-12-20' },
      { keyword: 'amen', count: 5, date: '2024-12-20' },
    ]);
  }
}
