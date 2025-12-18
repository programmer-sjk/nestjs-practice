import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductOptionGroup } from './product-option-group.entity';
import { ProductVariant } from './product-variant.entity';

@Index('IDX_PRODUCT_STORE_ID_CATEGORY_ID', ['storeId', 'categoryId'])
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column({ length: 64 })
  name: string;

  @Column()
  basePrice: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Column({ type: 'enum', enum: ProductStatus })
  status: ProductStatus;

  @Column({ nullable: true })
  categoryId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => ProductOptionGroup, (optionGroup) => optionGroup.product, {
    cascade: ['insert', 'update'],
  })
  optionGroups: ProductOptionGroup[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  static of(
    storeId: number,
    name: string,
    basePrice: number,
    description?: string,
    thumbnailUrl?: string,
    categoryId?: number,
    optionGroups?: ProductOptionGroup[],
  ) {
    const product = new Product();
    product.storeId = storeId;
    product.name = name;
    product.basePrice = basePrice;
    product.description = description;
    product.thumbnailUrl = thumbnailUrl;
    product.categoryId = categoryId;
    product.status = ProductStatus.DRAFT;

    if (optionGroups) {
      product.optionGroups = optionGroups;
    }

    return product;
  }

  update(
    name: string,
    basePrice: number,
    description?: string,
    thumbnailUrl?: string,
    categoryId?: number,
  ) {
    this.name = name;
    this.basePrice = basePrice;
    this.description = description;
    this.thumbnailUrl = thumbnailUrl;
    this.categoryId = categoryId;
  }
}
