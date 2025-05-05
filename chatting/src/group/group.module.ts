import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupUserRepository } from './repositories/group-user.repository';
import { GroupRepository } from './repositories/group.repository';

@Module({
  providers: [GroupService, GroupRepository, GroupUserRepository],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
