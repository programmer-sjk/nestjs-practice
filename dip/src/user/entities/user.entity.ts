import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('email', { unique: true })
  @Column({ length: 16 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  static of(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    return user;
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
  }
}
