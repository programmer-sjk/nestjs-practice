import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'badminton',
  logging: false,
  synchronize: false,
  entities: ['src/**/entity/*.{js,ts}'],
  migrations: ['src/migration/*.{js,ts}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(connectionOptions);
export default dataSource;
