import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storeId: number;

  @Column()
  orderId: number;

  @Column()
  section: string;

  @Column()
  rowNum: number;

  @Column()
  colNum: number;

  @CreateDateColumn()
  createdAt: Date;
}
