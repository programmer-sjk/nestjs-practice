import { BadRequestException } from '@nestjs/common';
import { MemberStatus } from '../enums/member-status.enum';

export class Member {
  email: string;
  nickname: string;
  passwordHash: string;
  status: MemberStatus;

  constructor(email: string, nickname: string, passwordHash: string) {
    this.email = email;
    this.nickname = nickname;
    this.passwordHash = passwordHash;
    this.status = MemberStatus.PENDING;
  }

  activate() {
    if (this.status !== MemberStatus.PENDING) {
      throw new BadRequestException('pending 상태가 아닙니다.');
    }

    this.status = MemberStatus.ACTIVE;
  }

  deactivate() {
    this.status = MemberStatus.DEACTIVATED;
  }
}
