import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../../domain/entities/store.entity';
import { IStoreRepository } from '../../domain/repositories/store-repository.interface';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectRepository(Store)
    private readonly repository: Repository<Store>,
  ) {}

  async save(store: Store) {
    return await this.repository.save(store);
  }
}
