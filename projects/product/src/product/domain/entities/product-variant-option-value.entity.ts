import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductOptionValue } from './product-option-value.entity';
import { ProductVariant } from './product-variant.entity';

@Entity()
export class ProductVariantOptionValue {
  @PrimaryColumn()
  variantId: number;

  @PrimaryColumn()
  optionValueId: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.variantOptionValues)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @ManyToOne(
    () => ProductOptionValue,
    (optionValue) => optionValue.variantOptionValues,
  )
  @JoinColumn({ name: 'option_value_id' })
  optionValue: ProductOptionValue;

  static of(variantId: number, optionValueId: number) {
    const entity = new ProductVariantOptionValue();
    entity.variantId = variantId;
    entity.optionValueId = optionValueId;

    return entity;
  }
}
