import { Product } from '../entities/product.entity';

export interface IProductRepository {
  findOneById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  save(entity: Product | Product[]);
  remove(entity: Product);
}
