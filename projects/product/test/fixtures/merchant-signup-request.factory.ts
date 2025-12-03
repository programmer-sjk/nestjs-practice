import { MerchantSignUpRequest } from '../../src/merchant/application/dto/merchant-signup.request';
import { BusinessType } from '../../src/merchant/domain/enums/business-type.enum';

export class MerchantSignupRequestFactory {
  static create(email: string) {
    const dto = new MerchantSignUpRequest();
    dto.email = email;
    dto.password = 'password';
    dto.businessNumber = '12-34-000001';
    dto.businessType = BusinessType.INDIVIDUAL;
    dto.representativeName = '홍길동';
    dto.phoneNumber = '010-1234-5678';

    return dto;
  }
}
