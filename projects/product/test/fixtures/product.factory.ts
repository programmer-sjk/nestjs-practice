import { Product } from '../../src/product/domain/entities/product.entity';

export class ProductFactory {
  static create(storeId: number, name: string, basePrice: number) {
    return Product.of(storeId, name, basePrice);
  }
}
