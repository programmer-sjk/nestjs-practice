import { Merchant } from '../entities/merchant.entity';

export interface IMerchantRepository {
  findOneById(id: number): Promise<Merchant | null>;
  findAll(): Promise<Merchant[]>;
  save(entity: Merchant | Merchant[]);
  remove(entity: Merchant);
}
