import { Injectable } from '@nestjs/common';
import { PasswordEncoderDomainService } from '../domain-services/password-encoder.domain-service';
import { Member } from '../domain/member.entity';

@Injectable()
export class MemberService {
  constructor(
    private readonly passwordEncoderDomainService: PasswordEncoderDomainService,
  ) {}

  signUp(email: string, nickname: string, password: string) {
    return Member.create(
      { email, nickname, password },
      this.passwordEncoderDomainService,
    );
  }
}
