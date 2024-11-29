import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  type: string;

  @Column()
  category: string;

  @Column()
  subCategory: string;

  @CreateDateColumn()
  createdAt: Date;
}
