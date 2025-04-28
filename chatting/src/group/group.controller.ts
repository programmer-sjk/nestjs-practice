import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AddGroupRequest } from './dto/add-group.request';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async addGroup(@Body() request: AddGroupRequest) {
    await this.groupService.addGroup(request);
    return ResponseEntity.OK();
  }
}
