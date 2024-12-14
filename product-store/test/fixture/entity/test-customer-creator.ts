import { Customer } from '../../../src/customer/entities/customer.entity';

export class TestCustomerCreator {
  private constructor() {}

  static of() {
    const cusomter = new Customer();
    cusomter.name = 'name';
    cusomter.accountName = 'haha';
    cusomter.password = 'password';
    cusomter.phone = '01048932229';
    cusomter.zipCode = '01513';
    cusomter.address = 'seoul';
    cusomter.addressDetail = '101';
    return cusomter;
  }
}
