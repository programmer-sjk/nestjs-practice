import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ERROR } from '../common/err-message';
import { ProductRegisterRequest } from './dto/product-register.request';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productRepository: ProductRepository,
  ) {}

  async findByIds(ids: number[]) {
    return this.productRepository.findBy({ id: In(ids) });
  }

  async addProduct(dto: ProductRegisterRequest) {
    const category = await this.categoryService.findOneById(dto.categoryId);
    if (!category) {
      throw new BadRequestException(ERROR.categoryNotFound);
    }

    await this.productRepository.save(dto.toEntity());
  }
}
