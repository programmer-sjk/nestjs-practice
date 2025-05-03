import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AddGroupRequest } from './dto/add-group.request';
import { InviteGroupRequest } from './dto/invite-group.request';
import { LeaveGroupRequest } from './dto/leave-group.request';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get(':id/user')
  async findGroupUsers(@Param('id') groupId: number) {
    const users = await this.groupService.findGroupUsers(groupId);
    return ResponseEntity.OK(users);
  }

  @Post()
  async addGroup(@Body() request: AddGroupRequest) {
    await this.groupService.addGroup(request);
    return ResponseEntity.OK();
  }

  @Post('invite')
  async inviteUser(@Body() request: InviteGroupRequest) {
    await this.groupService.invite(request);
    return ResponseEntity.OK();
  }

  @Delete('user')
  async leave(@Body() request: LeaveGroupRequest) {
    await this.groupService.leave(request.userId);
    return ResponseEntity.OK();
  }
}
