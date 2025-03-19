import { SignUpRequest } from '../dto/sign-up.request';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserRepository } from '../user.repository';

export class UserRepositoryAdaptor implements IUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneBy(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async find() {
    return this.userRepository.find();
  }

  async save(dto: SignUpRequest) {
    await this.userRepository.save(dto.toEntity());
  }

  async updatePassword(id: number, newPassword: string) {
    const user = await this.findOneBy(id);
    user.updatePassword(newPassword);
    await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy(id);
    await this.userRepository.remove(user);
  }
}
