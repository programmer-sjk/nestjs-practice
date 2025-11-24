import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductStatus } from '../enums/product-status.enum';

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

  static of(
    storeId: number,
    name: string,
    basePrice: number,
    description?: string,
    thumbnailUrl?: string,
    categoryId?: number,
  ) {
    const product = new Product();
    product.storeId = storeId;
    product.name = name;
    product.basePrice = basePrice;
    product.description = description;
    product.thumbnailUrl = thumbnailUrl;
    product.categoryId = categoryId;
    product.status = ProductStatus.DRAFT;

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
