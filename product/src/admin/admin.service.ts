import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminSignUpRequest } from './dto/admin-sign-up.request';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findOneByEmail(email: string) {
    return this.adminRepository.findOneBy({ email });
  }

  async addAdmin(dto: AdminSignUpRequest) {
    await this.adminRepository.save(dto.toEntity());
  }
}
