import { BadRequestException, Injectable } from '@nestjs/common';
import { AddGroupRequest } from './dto/add-group.request';
import { InviteGroupRequest } from './dto/invite-group.request';
import { LeaveGroupRequest } from './dto/leave-group.request';
import { GroupUser } from './entities/group-user.entity';
import { GroupUserRepository } from './repositories/group-user.repository';
import { GroupRepository } from './repositories/group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly groupUserRepository: GroupUserRepository,
  ) {}

  async findGroupUsers(groupId: number) {
    return this.groupUserRepository.findBy({ groupId });
  }

  async addGroup(dto: AddGroupRequest) {
    await this.groupRepository.save(dto.toEntity());
  }

  async invite(dto: InviteGroupRequest) {
    await this.validateUserInGroup(dto.groupId, dto.invitorId);
    const group = await this.findGroup(dto.groupId);
    await this.groupUserRepository.save(GroupUser.of(group, dto.inviteeId));
  }

  async leave(dto: LeaveGroupRequest) {
    const { userId, groupId } = dto;
    const groupUser = await this.groupUserRepository.findOneBy({
      userId,
      groupId,
    });

    if (groupUser) {
      await this.groupUserRepository.remove(groupUser);
    }
  }

  async validateUserInGroup(groupId: number, userId: number) {
    const userInGroup = await this.groupUserRepository.findOneBy({
      groupId,
      userId,
    });

    if (!userInGroup) {
      throw new BadRequestException('사용자가 채팅 그룹에 속해있지 않습니다.');
    }
  }

  private async findGroup(groupId: number) {
    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) {
      throw new BadRequestException('채팅 그룹이 존재하지 않습니다');
    }

    return group;
  }
}
