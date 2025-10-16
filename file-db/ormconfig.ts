import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: './databases/database.sqlite',
  synchronize: false,
  entities: [__dirname + '/**/entities/*.js'],
  migrations: [__dirname + '/migrations/*.js'],
  migrationsTableName: 'migrations',
  logging: true,
};

const dataSource = new DataSource(connectionOptions);
export default dataSource;
