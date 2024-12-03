import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './../../store/entities/store.entity';
import { Order } from './order.entity';

@Entity()
export class OrderLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column()
  orderId: number;

  @Column({ length: 32 })
  section: string;

  @Column()
  rowNum: number;

  @Column()
  colNum: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;
}
