import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
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

  static of(userId: number, title: string, body: string) {
    const post = new Post();
    post.userId = userId;
    post.title = title;
    post.body = body;

    return post;
  }

  update(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}
