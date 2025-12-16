import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('IDX_PRODUCT_OPTION_GROUP_PRODUCT_ID', ['productId'])
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
