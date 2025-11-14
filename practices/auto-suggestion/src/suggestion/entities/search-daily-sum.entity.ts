import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SearchDailySum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @Column()
  count: number;

  @Column({ length: 10 })
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}
