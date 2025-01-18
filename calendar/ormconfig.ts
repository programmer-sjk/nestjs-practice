import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'calendar',
  logging: true,
  synchronize: false,
  entities: [__dirname + '/src/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/src/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
};

export const typeormOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => connectionOptions,
  async dataSourceFactory(option) {
    if (!option) throw new Error('Invalid typeorm options passed');
    return addTransactionalDataSource(new DataSource(option));
  },
};

const dataSource = new DataSource(connectionOptions);
export default dataSource;
