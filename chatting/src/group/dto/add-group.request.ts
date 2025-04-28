import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { GroupUser } from '../entities/group-user.entity';
import { Group } from '../entities/group.entity';

export class AddGroupRequest {
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];

  toEntity() {
    const group = Group.of(this.name);
    const groupUsers = this.userIds.map((userId) =>
      GroupUser.of(group, userId),
    );

    group.groupUsers = groupUsers;
    return group;
  }
}
