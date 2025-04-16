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

  static of(userId: number, title: string, body: string) {
    const board = new Board();
    board.userId = userId;
    board.title = title;
    board.body = body;

    return board;
  }
}
