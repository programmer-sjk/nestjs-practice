import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../../domain/entities/merchant.entity';
import { IMerchantRepository } from '../../domain/repositories/merchant-repository.interface';

@Injectable()
export class MerchantRepository implements IMerchantRepository {
  constructor(
    @InjectRepository(Merchant)
    private readonly repository: Repository<Merchant>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.repository.findOneBy({ email });
  }

  async findAll() {
    return await this.repository.find();
  }

  async save(merchant: Merchant) {
    return await this.repository.save(merchant);
  }
}
