import { Column } from 'typeorm';

export class Address {
  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  static of(street: string, city: string, zipCode: string) {
    const address = new Address();
    address.street = street;
    address.city = city;
    address.zipCode = zipCode;

    return address;
  }
}
