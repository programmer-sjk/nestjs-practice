import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 32 })
  email: string;

  @Column({ length: 32 })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static of(name: string, email: string, phoneNumber: string) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    return user;
  }
}
