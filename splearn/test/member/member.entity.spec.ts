import { Member } from '../../src/member/entities/member.entity';
import { MemberStatus } from '../../src/member/enums/member-status.enum';

describe('Member', () => {
  it('Member 생성', () => {
    // when
    const member = new Member('test@example.com', 'test', 'password');

    // then
    expect(member.email).toBe('test@example.com');
    expect(member.nickname).toBe('test');
    expect(member.passwordHash).toBe('password');
    expect(member.status).toBe(MemberStatus.PENDING);
  });
});
