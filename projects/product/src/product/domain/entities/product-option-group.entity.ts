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
import { ProductOptionValue } from './product-option-value.entity';
import { Product } from './product.entity';

@Entity()
export class ProductOptionGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ length: 32 })
  name: string;

  @Column({ default: 0 })
  displayOrder: number;

  @Column({ default: true })
  isRequired: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.optionGroups)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(
    () => ProductOptionValue,
    (optionValue) => optionValue.optionGroup,
    {
      cascade: ['insert', 'update'],
    },
  )
  optionValues: ProductOptionValue[];

  static of(
    name: string,
    displayOrder: number = 0,
    isRequired: boolean = true,
    optionValues?: ProductOptionValue[],
  ) {
    const optionGroup = new ProductOptionGroup();
    optionGroup.name = name;
    optionGroup.displayOrder = displayOrder;
    optionGroup.isRequired = isRequired;

    if (optionValues) {
      optionGroup.optionValues = optionValues;
    }

    return optionGroup;
  }
}
