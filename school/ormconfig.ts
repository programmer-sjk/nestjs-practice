import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connectionOptions: TypeOrmModuleOptions = {
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
