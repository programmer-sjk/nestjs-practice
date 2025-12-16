import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductOptionGroup } from './product-option-group.entity';
import { ProductVariantOptionValue } from './product-variant-option-value.entity';

@Entity()
export class ProductOptionValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  optionGroupId: number;

  @Column({ length: 64 })
  value: string;

  @Column({ default: 0 })
  additionalPrice: number;

  @Column({ default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => ProductOptionGroup,
    (optionGroup) => optionGroup.optionValues,
  )
  @JoinColumn({ name: 'option_group_id' })
  optionGroup: ProductOptionGroup;

  @OneToMany(
    () => ProductVariantOptionValue,
    (variantOptionValue) => variantOptionValue.optionValue,
  )
  variantOptionValues: ProductVariantOptionValue[];

  static of(
    optionGroupId: number,
    value: string,
    additionalPrice: number = 0,
    displayOrder: number = 0,
  ) {
    const optionValue = new ProductOptionValue();
    optionValue.optionGroupId = optionGroupId;
    optionValue.value = value;
    optionValue.additionalPrice = additionalPrice;
    optionValue.displayOrder = displayOrder;

    return optionValue;
  }
}
