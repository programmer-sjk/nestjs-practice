import { Injectable } from '@nestjs/common';
import { PasswordEncoderDomainService } from '../domain-services/password-encoder.domain-service';
import { MemberRegisterRequest } from '../domain/member-register.request';
import { Member } from '../domain/member.entity';
import { MemberRegister } from './provided/member-register.interface';

@Injectable()
export class MemberService implements MemberRegister {
  constructor(
    private readonly passwordEncoderDomainService: PasswordEncoderDomainService,
  ) {}

  register(dto: MemberRegisterRequest) {
    return Member.create(dto, this.passwordEncoderDomainService);
  }
}
