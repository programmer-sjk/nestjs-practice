import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeliveryStatus } from '../enum/delivery-status.enum';
import { OrderStatus } from '../enum/order-status.enum';
import { Customer } from './../../customer/entities/customer.entity';
import { OrderItem } from './order-item.entity';
import { Price } from './price';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  price: number;

  @Column({ length: 16 })
  status: OrderStatus;

  @Column({ length: 16 })
  deliveryStatus: DeliveryStatus;

  @Column({ length: 5 })
  customerZipCode: string;

  @Column({ length: 32 })
  customerAddress: string;

  @Column({ length: 16 })
  customerAddressDetail: string;

  @Column({ nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @ManyToOne(() => Customer, (customer) => customer)
  customer: Customer;

  static createNew(customer: Customer) {
    const order = new Order();
    order.status = OrderStatus.IN_PROGRESS;
    order.deliveryStatus = DeliveryStatus.IN_PROGRESS;
    order.customerZipCode = customer.zipCode;
    order.customerAddress = customer.address;
    order.customerAddressDetail = customer.addressDetail;
    order.customer = customer;

    return order;
  }

  updateOrderItems(orderItems: OrderItem[]) {
    this.orderItems = orderItems;
  }

  updatePrice(price: Price) {
    this.price = price.value();
  }

  itemCount() {
    return this.orderItems.reduce((acc, item) => acc + item.count, 0);
  }
}
