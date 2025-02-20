import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('email', { unique: true })
  @Column({ length: 16 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static of(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    return user;
  }

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
}
