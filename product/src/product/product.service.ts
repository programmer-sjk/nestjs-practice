import { Injectable } from '@nestjs/common';
import { ProductRegisterRequest } from './dto/product-register.request';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
 
  async addProduct(dto: ProductRegisterRequest) {
    await this.productRepository.save(dto.toEntity());
  }
}
