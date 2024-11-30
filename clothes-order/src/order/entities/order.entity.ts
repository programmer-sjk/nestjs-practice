import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryStatus } from '../enum/delivery-status.enum';
import { OrderStatus } from '../enum/order-status.enum';
import { StoreStatus } from '../enum/store-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  price: number;

  @Column()
  status: OrderStatus;

  @Column()
  deliveryStatus: DeliveryStatus;

  @Column()
  storeStatus: StoreStatus;

  @Column({ length: 32 })
  customerAddress: string;

  @Column({ length: 16 })
  customerAddressDetail: string;

  @Column({ nullable: true })
  returnRequestAt?: Date;

  @Column({ nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static of(
    customerId: number,
    price: number,
    status: OrderStatus,
    deliveryStatus: DeliveryStatus,
    storeStatus: StoreStatus,
    customerAddress: string,
    customerAddressDetail: string,
  ) {
    const order = new Order();
    order.customerId = customerId;
    order.price = price;
    order.status = status;
    order.deliveryStatus = deliveryStatus;
    order.storeStatus = storeStatus;
    order.customerAddress = customerAddress;
    order.customerAddressDetail = customerAddressDetail;

    return order;
  }
}
