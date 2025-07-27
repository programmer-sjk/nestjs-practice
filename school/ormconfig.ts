import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'password',
  database: 'school',
  logging: true,
  synchronize: false,
  entities: [__dirname + '/src/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/src/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
};

export default new DataSource(connectionOptions);
