import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), ShortUrlModule],
})
export class AppModule {}
