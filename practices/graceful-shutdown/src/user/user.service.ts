import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async doLongQuery() {
    const user = new User();
    console.log(this.dataSource.isInitialized);

    await this.dataSource.transaction(async (manager) => {
      user.name = 'before shutdown';
      const savedUser = await manager.save(user);

      await this.delay(8); // 8초 delay

      savedUser.name = 'after shutdown';
      await manager.save(user);
    });
    console.log(this.dataSource.isInitialized);
  }

  async doLongQuery2() {
    const user = new User();

    await this.dataSource.transaction(async (manager) => {
      user.name = 'before shutdown';
      const savedUser = await manager.save(user);

      await this.delay(15); // 15초 delay

      savedUser.name = 'after shutdown';
      await manager.save(user);
    });
  }

  private async delay(second: number) {
    return new Promise((resolve) => setTimeout(resolve, second * 1000));
  }
}
