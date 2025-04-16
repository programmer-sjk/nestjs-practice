import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { BoardModule } from './board/board.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), BoardModule],
})
export class AppModule {}
