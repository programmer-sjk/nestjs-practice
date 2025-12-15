import { IBaseRepository } from '../../../common/base-repository.interface';
import { Merchant } from '../entities/merchant.entity';

export interface IMerchantRepository extends IBaseRepository<Merchant> {
  findOneByEmail(email: string): Promise<Merchant | null>;
}
