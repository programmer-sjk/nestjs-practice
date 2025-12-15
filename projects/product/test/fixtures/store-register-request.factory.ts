import { StoreRegisterRequest } from '../../src/store/application/dto/store-register.request';

export class StoreRegisterRequestFactory {
  static create(name: string) {
    const dto = new StoreRegisterRequest();
    dto.name = name;

    return dto;
  }
}
