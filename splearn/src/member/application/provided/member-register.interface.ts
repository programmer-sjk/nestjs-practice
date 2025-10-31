import { MemberRegisterRequest } from '../../entities/member-register.request';
import { Member } from '../../entities/member.entity';

export interface MemberRegister {
  register(request: MemberRegisterRequest): Promise<Member>;
}
