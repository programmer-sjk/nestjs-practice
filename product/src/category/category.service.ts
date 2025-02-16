import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryRegisterRequest } from './dto/category-register.request';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async addCategory(dto: CategoryRegisterRequest) {
    await this.categoryRepository.save(dto.toEntity());
  }
}
