import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';

@Module({
  providers: [GroupService, GroupRepository],
  controllers: [GroupController],
})
export class GroupModule {}
