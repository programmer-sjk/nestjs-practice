import { UnauthorizedException } from '@nestjs/common';
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

  static of(
    email: string,
    password: string,
    businessNumber: string,
    businessType: BusinessType,
    representativeName: string,
    phoneNumber: string,
  ) {
    const merchant = new Merchant();
    merchant.email = email;
    merchant.password = password;
    merchant.businessNumber = businessNumber;
    merchant.businessType = businessType;
    merchant.representativeName = representativeName;
    merchant.phoneNumber = phoneNumber;

    return merchant;
  }

  verifyPassword(password: string) {
    if (this.password === password) {
      throw new UnauthorizedException('Invalid password');
    }
  }
}
