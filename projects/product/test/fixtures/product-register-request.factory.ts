import { ProductRegisterRequest } from '../../src/product/application/dto/product-register.request';

export class ProductRegisterRequestFactory {
  static create(storeId: number, productName: string, basePrice: number) {
    const dto = new ProductRegisterRequest();
    dto.storeId = storeId;
    dto.name = productName;
    dto.basePrice = basePrice;

    return dto;
  }
}
