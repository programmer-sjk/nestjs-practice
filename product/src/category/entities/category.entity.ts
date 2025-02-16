import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  static of(name: string) {
    const category = new Category();
    category.name = name;
    return category;
  }
}
