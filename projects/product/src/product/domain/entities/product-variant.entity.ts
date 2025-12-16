import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ProductVariantOptionValue } from './product-variant-option-value.entity';
import { Product } from './product.entity';

@Unique('UQ_PRODUCT_VARIANT_SKU', ['sku'])
@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ length: 64 })
  sku: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(
    () => ProductVariantOptionValue,
    (variantOptionValue) => variantOptionValue.variant,
  )
  variantOptionValues: ProductVariantOptionValue[];
}
