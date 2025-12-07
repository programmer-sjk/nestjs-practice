import { Store } from '../entities/store.entity';

export interface IStoreRepository {
  save(entity: Store | Store[]);
}
