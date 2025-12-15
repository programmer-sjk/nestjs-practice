import { IBaseRepository } from '../../../common/base-repository.interface';
import { Product } from '../entities/product.entity';

export interface IProductRepository extends IBaseRepository<Product> {
  findOneById(id: number): Promise<Product | null>;
  remove(entity: Product);
}
