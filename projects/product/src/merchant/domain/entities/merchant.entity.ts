import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessType } from '../enums/business-type.enum';

@Unique('UQ_MERCHANT_EMAIL', ['email'])
@Unique('UQ_MERCHANT_BUSINESS_NUMBER', ['businessNumber'])
@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 12 })
  businessNumber: string;

  @Column({ type: 'enum', enum: BusinessType })
  businessType: BusinessType;

  @Column({ length: 50 })
  representativeName: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
