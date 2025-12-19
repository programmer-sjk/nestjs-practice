import { ProductOptionValue } from '../../src/product/domain/entities/product-option-value.entity';

export class ProductOptionValueFactory {
  static create(value: string) {
    return ProductOptionValue.of(value);
  }
}
