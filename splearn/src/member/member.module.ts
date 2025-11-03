import { Module } from '@nestjs/common';
import { MemberService } from './application/member.service';
import { MemberRepository } from './application/required/member.repository';
import { PasswordEncoderDomainService } from './domain-services/password-encoder.domain-service';

@Module({
  providers: [MemberService, PasswordEncoderDomainService, MemberRepository],
})
export class MemberModule {}
