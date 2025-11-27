import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './application/services/product.service';
import { Product } from './domain/entities/product.entity';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { ProductController } from './presentation/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
