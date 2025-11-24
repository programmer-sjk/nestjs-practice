import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/persistence/product.repository';
import { ProductRegisterRequest } from '../dto/product-register.request';
import { ProductUpdateRequest } from '../dto/product-update.request';
import { ProductResponse } from '../dto/product.response';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async find(id: number) {
    const product = await this.findOneOrThrow(id);
    return ProductResponse.from(product);
  }

  async findAll() {
    const products = await this.productRepository.findAll();
    return products.map((product) => ProductResponse.from(product));
  }

  async register(dto: ProductRegisterRequest) {
    return this.productRepository.save(dto.toEntity());
  }

  async update(id: number, dto: ProductUpdateRequest) {
    const product = await this.findOneOrThrow(id);
    product.update(
      dto.name,
      dto.basePrice,
      dto.description,
      dto.thumbnailUrl,
      dto.categoryId,
    );

    await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOneOrThrow(id);
    await this.productRepository.remove(product);
  }

  private async findOneOrThrow(id: number) {
    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
