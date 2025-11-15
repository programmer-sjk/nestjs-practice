import { Product } from '../entities/product.entity';

export interface IProductRepository {
  findOneById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  //   save(dto: ProductRegisterRequest);
  //   update(dto: ProductUpdateRequest);
  //   remove(id: number);
}
