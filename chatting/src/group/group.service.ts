import { Injectable } from '@nestjs/common';
import { AddGroupRequest } from './dto/add-group.request';
import { GroupRepository } from './repositories/group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async addGroup(dto: AddGroupRequest) {
    await this.groupRepository.save(dto.toEntity());
  }
}
