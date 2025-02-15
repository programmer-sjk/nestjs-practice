import { Injectable } from '@nestjs/common';
import { SignUpRequest } from '../user/dto/sign-up.request';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findOneByEmail(email: string) {
    return this.adminRepository.findOneBy({ email });
  }

  async addAdmin(dto: SignUpRequest) {
    await this.adminRepository.save(dto.toEntity());
  }
}
