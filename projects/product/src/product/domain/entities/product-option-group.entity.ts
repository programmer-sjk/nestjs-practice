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
  @JoinColumn({ name: 'productId' })
  product: Product;

  @OneToMany(() => ProductOptionValue, (optionValue) => optionValue.optionGroup)
  optionValues: ProductOptionValue[];

  static of(
    productId: number,
    name: string,
    displayOrder: number = 0,
    isRequired: boolean = true,
  ) {
    const optionGroup = new ProductOptionGroup();
    optionGroup.productId = productId;
    optionGroup.name = name;
    optionGroup.displayOrder = displayOrder;
    optionGroup.isRequired = isRequired;

    return optionGroup;
  }
}
