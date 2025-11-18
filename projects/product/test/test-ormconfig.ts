import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const testConnectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'test',
  logging: false,
  synchronize: true,
  entities: [__dirname + '/../src/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/../src/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(testConnectionOptions);
