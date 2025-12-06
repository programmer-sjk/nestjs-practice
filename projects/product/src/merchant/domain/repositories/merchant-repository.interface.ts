import { Merchant } from '../entities/merchant.entity';

export interface IMerchantRepository {
  findOneByEmail(email: string): Promise<Merchant | null>;
  save(entity: Merchant | Merchant[]);
}
