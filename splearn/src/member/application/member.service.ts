import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordEncoderDomainService } from '../domain-services/password-encoder.domain-service';
import { MemberRegisterRequest } from '../domain/member-register.request';
import { Member } from '../domain/member.entity';
import { MemberRegister } from './provided/member-register.interface';
import { MemberRepository } from './required/member.repository';

@Injectable()
export class MemberService implements MemberRegister {
  constructor(
    private readonly passwordEncoderDomainService: PasswordEncoderDomainService,
    private readonly memberRepository: MemberRepository,
  ) {}

  async register(dto: MemberRegisterRequest) {
    const member = Member.create(dto, this.passwordEncoderDomainService);
    return await this.memberRepository.save(member);
  }

  async activate(id: number) {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    member.activate();
    return await this.memberRepository.save(member);
  }
}
