import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column(() => Address)
  address: Address;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static of(name: string, email: string, password: string, address: Address) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.address = address;

    return user;
  }
}
