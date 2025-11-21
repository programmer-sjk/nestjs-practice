import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/persistence/product.repository';
import { ProductRegisterRequest } from '../dto/product-register.request';
import { ProductResponse } from '../dto/product.response';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async find(id: number) {
    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductResponse.from(product);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async register(dto: ProductRegisterRequest) {
    return this.productRepository.save(dto.toEntity());
  }
}
