import { Address } from 'cluster';

export class User {
  id: number;

  name: string;

  password: string;

  address: Address;

  createdAt: Date;

  deletedAt: Date;
}
