import { BadRequestException, Injectable } from '@nestjs/common';
import { AddGroupRequest } from './dto/add-group.request';
import { GroupUserRepository } from './repositories/group-user.repository';
import { GroupRepository } from './repositories/group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly groupUserRepository: GroupUserRepository,
  ) {}

  async addGroup(dto: AddGroupRequest) {
    await this.groupRepository.save(dto.toEntity());
  }

  private async validateInvite(groupId: number, invitorId: number) {
    const userInGroup = await this.groupUserRepository.findOneBy({
      groupId,
      userId: invitorId,
    });
    if (!userInGroup) {
      throw new BadRequestException('사용자가 채팅 그룹에 속해있지 않습니다.');
    }
  }
}
