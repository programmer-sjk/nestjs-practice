import { Merchant } from '../entities/merchant.entity';

export interface IMerchantRepository {
  save(entity: Merchant | Merchant[]);
}
