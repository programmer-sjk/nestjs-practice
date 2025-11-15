import { Module } from '@nestjs/common';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { ProductController } from './presentation/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
