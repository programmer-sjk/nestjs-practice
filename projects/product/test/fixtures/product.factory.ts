import { ProductOptionGroup } from '../../src/product/domain/entities/product-option-group.entity';
import { Product } from '../../src/product/domain/entities/product.entity';

export class ProductFactory {
  static create(storeId: number, name: string, basePrice: number) {
    return Product.of(storeId, name, basePrice);
  }

  static createWithOptionGroups(
    storeId: number,
    name: string,
    basePrice: number,
    optionGroups: ProductOptionGroup[],
  ) {
    const product = Product.of(storeId, name, basePrice);
    product.optionGroups = optionGroups;
    return product;
  }
}
