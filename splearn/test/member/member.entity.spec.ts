import { BadRequestException } from '@nestjs/common';
import { PasswordEncoderDomainService } from '../../src/member/domain-services/password-encoder.domain-service';
import { Member } from '../../src/member/entities/member.entity';
import { MemberStatus } from '../../src/member/enums/member-status.enum';

describe('Member', () => {
  let member: Member;

  beforeEach(() => {
    member = Member.create(
      { email: 'test@example.com', nickname: 'test', password: 'password' },
      new PasswordEncoderDomainService(),
    );
  });

  it('Member는 active 상태로 변경될 수 있다.', () => {
    // when
    member.activate();

    // then
    expect(member.status).toBe(MemberStatus.ACTIVE);
  });

  it('active된 상태의 member는 더 이상 active 상태로 변경될 수 없다.', () => {
    // given
    member.activate();

    // when & then
    expect(() => member.activate()).toThrow(
      new BadRequestException('pending 상태가 아닙니다.'),
    );
  });

  it('회원은 탈퇴할 수 있다.', () => {
    // given
    member.activate();

    // when
    member.deactivate();

    // then
    expect(member.status).toBe(MemberStatus.DEACTIVATED);
  });

  it('active된 회원만 탈퇴할 수 있다.', () => {
    // when & then
    expect(() => member.deactivate()).toThrow(
      new BadRequestException('active 상태가 아닙니다.'),
    );
  });

  it('회원은 비밀번호를 검증할 수 있다.', () => {
    // when
    const result = member.verifyPassword(
      'password',
      new PasswordEncoderDomainService(),
    );

    // then
    expect(result).toBe(true);
  });
});
