import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { RegisterRequest } from './dto/register.request';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  
  async addCategory(dto: RegisterRequest) {
    await this.categoryRepository.save(dto.toEntity())
  }
}
