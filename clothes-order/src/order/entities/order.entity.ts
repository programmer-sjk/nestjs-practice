import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryStatus } from '../enum/delivery-status.enum';
import { OrderStatus } from '../enum/order-status.enum';
import { StoreStatus } from '../enum/store-status.enum';
import { Customer } from './../../customer/entities/customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  status: OrderStatus;

  @Column()
  deliveryStatus: DeliveryStatus;

  @Column()
  storeStatus: StoreStatus;

  @Column({ length: 16 })
  customerZipCode: string;

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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  static of(
    customer: Customer,
    price: number,
    status: OrderStatus,
    deliveryStatus: DeliveryStatus,
    storeStatus: StoreStatus,
  ) {
    const order = new Order();
    order.price = price;
    order.status = status;
    order.deliveryStatus = deliveryStatus;
    order.storeStatus = storeStatus;
    order.customerZipCode = customer.zipCode;
    order.customerAddress = customer.address;
    order.customerAddressDetail = customer.addressDetail;
    order.customer = customer;

    return order;
  }

  updateOrderItems(orderItems: OrderItem[]) {
    this.orderItems = orderItems;
  }
}
