import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IProductRepository } from '../../domain/repositories/product-repository.interface';
import { ProductRegisterRequest } from '../dto/product-register.request';
import { ProductUpdateRequest } from '../dto/product-update.request';
import { ProductResponse } from '../dto/product.response';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async find(id: number) {
    const product = await this.findOneOrThrow(id);
    return ProductResponse.from(product);
  }

  async findAll() {
    const products = await this.productRepository.findAll();
    return products.map((product) => ProductResponse.from(product));
  }

  async register(dto: ProductRegisterRequest) {
    await this.productRepository.save(dto.toEntity());
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
    const product = await this.findOneWithRelationsOrThrow(id);

    product.deletedAt = new Date();
    for (const group of product.optionGroups) {
      group.deletedAt = product.deletedAt;
      group.optionValues.map((value) => (value.deletedAt = product.deletedAt));
    }

    await this.productRepository.save(product);
  }

  private async findOneOrThrow(id: number) {
    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  private async findOneWithRelationsOrThrow(id: number) {
    const product = await this.productRepository.findOneWithRelations(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
