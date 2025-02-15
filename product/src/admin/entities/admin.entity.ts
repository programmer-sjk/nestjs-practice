import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('email', { unique: true })
  @Column({ length: 16 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static of(email: string, password: string) {
    const admin = new Admin();
    admin.email = email;
    admin.password = password;
    return admin;
  }
}
