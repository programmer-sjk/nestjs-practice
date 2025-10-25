import { BadRequestException } from '@nestjs/common';
import { MemberStatus } from '../enums/member-status.enum';
import { MemberProps } from '../interfaces/member-props.interface';
import { PasswordEncoder } from '../interfaces/password-encoder.interface';

export class Member {
  email: string;
  nickname: string;
  passwordHash: string;
  status: MemberStatus;

  private constructor(email: string, nickname: string, passwordHash: string) {
    this.email = email;
    this.nickname = nickname;
    this.passwordHash = passwordHash;
    this.status = MemberStatus.PENDING;
  }

  static create(props: MemberProps, PasswordEncoder: PasswordEncoder) {
    return new Member(
      props.email,
      props.nickname,
      PasswordEncoder.encode(props.password),
    );
  }

  activate() {
    if (this.status !== MemberStatus.PENDING) {
      throw new BadRequestException('pending 상태가 아닙니다.');
    }

    this.status = MemberStatus.ACTIVE;
  }

  deactivate() {
    if (this.status !== MemberStatus.ACTIVE) {
      throw new BadRequestException('active 상태가 아닙니다.');
    }

    this.status = MemberStatus.DEACTIVATED;
  }

  verifyPassword(password: string, passwordEncoder: PasswordEncoder) {
    return passwordEncoder.verify(password, this.passwordHash);
  }
}
