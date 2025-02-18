import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  static of(userId: number, value: number) {
    const point = new Point();
    point.userId = userId;
    point.value = value;
    return point;
  }
}
