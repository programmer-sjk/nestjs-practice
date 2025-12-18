import {
  OptionGroupRegisterInputs,
  OptionValueRegisterInputs,
  ProductRegisterRequest,
} from '../../src/product/application/dto/product-register.request';

export class ProductRegisterRequestFactory {
  static create(storeId: number, productName: string, basePrice: number) {
    const dto = new ProductRegisterRequest();
    dto.storeId = storeId;
    dto.name = productName;
    dto.basePrice = basePrice;

    return dto;
  }

  static createWithOptionGroups(
    storeId: number,
    productName: string,
    basePrice: number,
    optionGroups: OptionGroupRegisterInputs[],
  ) {
    const dto = new ProductRegisterRequest();
    dto.storeId = storeId;
    dto.name = productName;
    dto.basePrice = basePrice;
    dto.optionGroups = optionGroups;

    return dto;
  }
}

export class OptionGroupRegisterFactory {
  static create(name: string) {
    const dto = new OptionGroupRegisterInputs();
    dto.name = name;

    return dto;
  }
}

export class OptionValueRegisterFactory {
  static create(value: string) {
    const dto = new OptionValueRegisterInputs();
    dto.value = value;

    return dto;
  }
}
