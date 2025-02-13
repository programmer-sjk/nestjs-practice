import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'product',
  logging: true,
  synchronize: false,
  entities: [__dirname + '/src/**/entities/*.{js,ts}'],
  migrations: [__dirname + '/src/migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(connectionOptions);
export default dataSource;
