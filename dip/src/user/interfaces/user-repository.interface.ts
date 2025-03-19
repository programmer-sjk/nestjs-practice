import { SignUpRequest } from '../dto/sign-up.request';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findOneBy(id: number): User;
  find(): User[];
  save(dto: SignUpRequest);
  updatePassword(id: number, newPassword: string);
  remove(id: number);
}
