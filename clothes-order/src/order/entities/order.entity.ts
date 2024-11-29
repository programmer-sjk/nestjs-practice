import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  storeId: number;

  @Column()
  price: number;

  @Column()
  status: number;

  @Column()
  deliveryStatus: number;

  @Column()
  storeStatus: number;

  @Column()
  pickUpDate: Date;

  @Column({ length: 32 })
  customerAddress: string;

  @Column({ length: 16 })
  customerAddressDetail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
