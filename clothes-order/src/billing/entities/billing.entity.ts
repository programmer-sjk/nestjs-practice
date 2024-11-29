import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BillingStatus } from '../enum/billing-status.enum';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column({ length: 16 })
  billingKey: string;

  @Column()
  status: BillingStatus;

  @CreateDateColumn()
  createdAt: Date;
}
