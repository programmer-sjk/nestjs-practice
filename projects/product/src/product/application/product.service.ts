import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../infrastructure/persistence/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async find(id: number) {
    return this.productRepository.findOneById(id);
  }

  async findAll() {
    return this.productRepository.findAll();
  }
}
