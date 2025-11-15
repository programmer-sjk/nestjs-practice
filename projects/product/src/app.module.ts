import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), ProductModule],
})
export class AppModule {}
