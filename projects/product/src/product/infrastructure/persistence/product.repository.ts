import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/repositories/product-repository.interface';

@Injectable()
export class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  constructor(dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async findOneById(id: number): Promise<Product | null> {
    return super.findOneBy({ id });
  }

  async findAll(): Promise<Product[]> {
    return super.find();
  }
}
