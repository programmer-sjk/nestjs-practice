import { Store } from '../../src/store/domain/entities/store.entity';

export class StoreFactory {
  static create(merchantId: number, name?: string) {
    return Store.of(merchantId, name ?? 'test store name');
  }
}
