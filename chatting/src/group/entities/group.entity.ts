import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  static of(name: string) {
    const group = new Group();
    group.name = name;
    return group;
  }
}
