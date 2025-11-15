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
}
