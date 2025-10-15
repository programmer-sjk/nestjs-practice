import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  entities: [__dirname + '/src/**/entities/*.{js,ts}'],
};

const dataSource = new DataSource(connectionOptions);
export default dataSource;
