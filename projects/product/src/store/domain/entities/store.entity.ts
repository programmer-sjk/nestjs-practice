import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from '../../../merchant/domain/entities/merchant.entity';
import { StoreStatus } from '../enums/store-status.enum';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_STORE_MERCHANT_ID')
  @Column()
  merchantId: number;

  @Column({ length: 64 })
  name: string;

  @Column({ type: 'enum', enum: StoreStatus })
  status: StoreStatus;

  @Column({ length: 64, nullable: true })
  address?: string;

  @Column({ length: 64, nullable: true })
  addressDetail?: string;

  @Column({ length: 10, nullable: true })
  zipCode?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Merchant, (merchant) => merchant.stores)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  static of(
    merchantId: number,
    name: string,
    address: string,
    addressDetail?: string,
    zipCode?: string,
  ) {
    const store = new Store();
    store.merchantId = merchantId;
    store.name = name;
    store.address = address;
    store.addressDetail = addressDetail;
    store.zipCode = zipCode;
    store.status = StoreStatus.DRAFT;

    return store;
  }
}
