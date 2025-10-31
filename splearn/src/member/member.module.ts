import { Module } from '@nestjs/common';
import { MemberService } from './application/member.service';

@Module({
  providers: [MemberService],
})
export class MemberModule {}
