import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const connectionOptions: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'badminton',
  logging: true,
  synchronize: false,
  entities: [__dirname + '/src/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/src/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  seeds: [__dirname + '/src/migrations/seeds/*.{js,ts}'],
};

const dataSource = new DataSource(connectionOptions);
export default dataSource;
