import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from 'ormconfig';
import { UsersModule } from './users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), UsersModule],
})
export class AppModule {}
