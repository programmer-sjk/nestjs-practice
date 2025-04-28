import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupUser } from './group-user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group, {
    cascade: ['insert'],
  })
  groupUsers: GroupUser[];

  static of(name: string) {
    const group = new Group();
    group.name = name;
    return group;
  }
}
