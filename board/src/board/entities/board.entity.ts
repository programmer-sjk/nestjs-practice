import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('userId')
  @Column()
  userId: number;

  @Column({ length: 64 })
  title: string;

  @Column({ length: 1024 })
  body: string;

  @CreateDateColumn()
  createdAt: Date;
}
