import { Product } from '../../../src/product/entities/product.entity';

export class ProductFactory {
  private constructor() {}

  static of(name: string) {
    const price = 1_000;
    const stock = 10;
    const categoryId = 1;
    return Product.of(name, price, stock, categoryId);
  }
}
