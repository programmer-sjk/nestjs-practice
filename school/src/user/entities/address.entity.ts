import { Column } from 'typeorm';

export class Address {
  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;
}
