import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('userId')
  @Column()
  userId: number;

  @Index('postId')
  @Column()
  postId: number;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;
}
