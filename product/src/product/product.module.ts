import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
