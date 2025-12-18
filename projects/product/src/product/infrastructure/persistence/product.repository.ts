import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/repositories/product-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findOneById(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async findOneWithRelations(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: ['optionGroups', 'optionGroups.optionValues'],
    });
  }

  async findAll() {
    return await this.repository.find();
  }

  async save(product: Product) {
    return await this.repository.save(product);
  }

  async remove(product: Product) {
    return await this.repository.remove(product);
  }

  async softRemove(product: Product) {
    return await this.repository.softRemove(product);
  }
}
