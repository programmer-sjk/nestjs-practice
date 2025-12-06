import { Inject, Injectable } from '@nestjs/common';
import type { IMerchantRepository } from '../../domain/repositories/merchant-repository.interface';
import { MerchantSignUpRequest } from '../dto/merchant-signup.request';

@Injectable()
export class MerchantService {
  constructor(
    @Inject('IMerchantRepository')
    private readonly merchantRepository: IMerchantRepository,
  ) {}

  async findByEmail(email: string) {
    return await this.merchantRepository.findOneByEmail(email);
  }

  async signUp(dto: MerchantSignUpRequest) {
    await this.merchantRepository.save(dto.toEntity());
  }
}
