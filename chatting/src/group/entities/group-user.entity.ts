import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class GroupUser {
  @PrimaryColumn()
  groupId: number;

  @Index('userId')
  @PrimaryColumn()
  userId: number;

  @Column('boolean')
  isAlarm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Group, (group) => group.groupUsers, {
    createForeignKeyConstraints: false,
  })
  group: Group;

  static of(group: Group, userId: number) {
    const groupUser = new GroupUser();
    groupUser.group = group;
    groupUser.userId = userId;
    groupUser.isAlarm = true;

    return groupUser;
  }
}
