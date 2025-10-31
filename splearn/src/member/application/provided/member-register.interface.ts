import { MemberRegisterRequest } from '../../domain/member-register.request';
import { Member } from '../../domain/member.entity';

export interface MemberRegister {
  register(request: MemberRegisterRequest): Promise<Member>;
}
