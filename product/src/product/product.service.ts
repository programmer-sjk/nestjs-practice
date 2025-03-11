import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ERROR } from '../common/err-message';
import { ProductRegisterRequest } from './dto/product-register.request';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productRepository: ProductRepository,
  ) {}

  async findByIdsWithPessimisticLock(ids: number[]) {
    return this.productRepository.find({
      where: { id: In(ids) },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async addProduct(dto: ProductRegisterRequest) {
    const category = await this.categoryService.findOneById(dto.categoryId);
    if (!category) {
      throw new BadRequestException(ERROR.categoryNotFound);
    }

    await this.productRepository.save(dto.toEntity());
  }

  async decreaseStock(products: Product[]) {
    products.forEach((product) => product.decreaseStock());
    await this.productRepository.save(products);
  }
}
