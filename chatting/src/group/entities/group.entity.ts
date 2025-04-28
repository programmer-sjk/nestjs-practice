import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Index('userId')
  @Column()
  userId: number;

  @Column('boolean')
  isAlarm: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
