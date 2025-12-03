import { Merchant } from '../../src/merchant/domain/entities/merchant.entity';
import { BusinessType } from '../../src/merchant/domain/enums/business-type.enum';

export class MerchantFactory {
  static create(email: string) {
    return Merchant.of(
      email,
      'password',
      '12-34-000001',
      BusinessType.INDIVIDUAL,
      '홍길동',
      '010-1234-5678',
    );
  }
}
