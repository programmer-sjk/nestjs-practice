import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), UserModule],
})
export class AppModule {}
