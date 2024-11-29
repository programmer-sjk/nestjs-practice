import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 10 })
  accountName: string;

  @Column()
  password: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ nullable: true, length: 16 })
  card_number?: string;

  @Column({ nullable: true })
  billingKey?: string;

  @Column({ length: 5 })
  zipCode: string;

  @Column({ length: 32 })
  address: string;

  @Column({ length: 16 })
  addressDetail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
