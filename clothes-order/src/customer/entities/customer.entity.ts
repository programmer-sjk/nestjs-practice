import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DayUtil } from './../../common/day-util';

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

  private readonly NEW_MEMBER_PERIOD = 90;

  isNewMember() {
    const signedUpDay = DayUtil.diff(this.createdAt);
    return signedUpDay <= this.NEW_MEMBER_PERIOD;
  }
}
