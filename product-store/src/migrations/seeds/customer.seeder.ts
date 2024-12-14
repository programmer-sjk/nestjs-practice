import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Customer } from '../../customer/entities/customer.entity';

export default class CustomerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Customer);
    await repository.insert([
      {
        id: 1,
        name: '호갱',
        accountName: '친절한 금자씨',
        password: 'password',
        phone: '01012345678',
        zipCode: '01345',
        address: '서울시 서대문구',
        addressDetail: '202호',
      },
    ]);
  }
}
