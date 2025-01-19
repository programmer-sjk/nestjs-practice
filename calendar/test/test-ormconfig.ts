import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const testConnectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  logging: false,
  synchronize: true,
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export const testTypeormOptions: TypeOrmModuleAsyncOptions = {
  useFactory: () => testConnectionOptions,
  async dataSourceFactory(option) {
    if (!option) throw new Error('Invalid typeorm options passed');
    return addTransactionalDataSource(new DataSource(option));
  },
};
