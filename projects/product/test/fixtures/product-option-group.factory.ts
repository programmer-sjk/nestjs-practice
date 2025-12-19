import { ProductOptionGroup } from '../../src/product/domain/entities/product-option-group.entity';

export class ProductOptionGroupFactory {
  static create(name: string) {
    return ProductOptionGroup.of(name);
  }
}
