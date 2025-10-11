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
}
