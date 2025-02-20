import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { ProductRegisterRequest } from './dto/product-register.request';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findByIds(ids: number[]) {
    return this.productRepository.findBy({ id: In(ids) });
  }

  async addProduct(dto: ProductRegisterRequest) {
    await this.productRepository.save(dto.toEntity());
  }
}
