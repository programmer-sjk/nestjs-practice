import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
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

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
