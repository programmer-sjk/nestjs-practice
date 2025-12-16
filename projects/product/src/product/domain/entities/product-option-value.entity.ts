import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
