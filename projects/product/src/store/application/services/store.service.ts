import { Inject, Injectable } from '@nestjs/common';
import type { IStoreRepository } from '../../domain/repositories/store-repository.interface';
import { StoreRegisterRequest } from '../dto/store-register.request';

@Injectable()
export class StoreService {
  constructor(
    @Inject('IStoreRepository')
    private readonly storeRepository: IStoreRepository,
  ) {}

  async register(merchantId: number, dto: StoreRegisterRequest) {
    await this.storeRepository.save(dto.toEntity(merchantId));
  }
}
