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

  static of(userId: number, postId: number, body: string, parentId?: number) {
    const comment = new Comment();
    comment.userId = userId;
    comment.postId = postId;
    comment.body = body;
    comment.parentId = parentId;
    return comment;
  }
}
