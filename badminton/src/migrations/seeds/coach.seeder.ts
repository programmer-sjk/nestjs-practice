import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Coach } from '../../coach/entities/coach.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Coach);
    await repository.insert([
      { id: 1, name: '조자룡' },
      { id: 2, name: '여포' },
      { id: 3, name: '관우' },
      { id: 4, name: '장비' },
    ]);
  }
}
