import { BadRequestException } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MemberStatus } from '../enums/member-status.enum';
import { MemberProps } from '../interfaces/member-props.interface';
import { PasswordEncoder } from '../interfaces/password-encoder.interface';
import { Email } from './email.vo';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  passwordHash: string;

  @Column()
  status: MemberStatus;

  private constructor(email: Email, nickname: string, passwordHash: string) {
    this.email = email?.value;
    this.nickname = nickname;
    this.passwordHash = passwordHash;
    this.status = MemberStatus.PENDING;
  }

  static create(props: MemberProps, PasswordEncoder: PasswordEncoder) {
    const email = new Email(props.email);

    return new Member(
      email,
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
